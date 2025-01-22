import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { MediaType, Prisma, PrismaClient } from '@prisma/client';
import { readdirSync, readFileSync } from 'fs';
import * as fs from 'fs';

const images = readdirSync('./prisma/seeds/data');

const s3Client = new S3Client({
  region: process.env.S3_REGION,
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const uploadImageToS3 = async (filename: string): Promise<string> => {
  const file = readFileSync(`./prisma/seeds/data/${filename}`);
  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: filename,
      Body: file,
    }),
  );
  return `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET_NAME}/${filename}`;
};

const createMedia = async (
  prisma: PrismaClient,
  imageUrl: string,
  filename: string,
) => {
  const existingMedia = await prisma.media.findFirst({
    where: {
      OR: [{ url: imageUrl }, { filename: filename }],
    },
  });

  if (existingMedia) {
    return existingMedia;
  }

  return await prisma.media.create({
    data: {
      type: MediaType.POST,
      url: imageUrl,
      filename,
    },
  });
};

const createPost = async (
  prisma: PrismaClient,
  {
    index,
    content,
    description,
    imageUrl,
    ownerId,
    mediaId,
  }: {
    index: number;
    content: string;
    description: string;
    imageUrl: string;
    ownerId: string;
    mediaId: string;
  },
) =>
  await prisma.post.create({
    data: {
      title: `Post ${index + 1}`,
      content,
      description,
      url: 'https://example.com',
      ownerId,
      postMedias: {
        create: {
          mediaId,
        },
      },
    },
  });

export const postSeed = async (prisma: PrismaClient) => {
  const owner = await prisma.user.findFirst();

  const posts = await Promise.all(
    Array.from({ length: 50 }, async (_, index) => {
      const randomImage = getRandomElement(images);
      const imageUrl = await uploadImageToS3(randomImage);
      const media = await createMedia(prisma, imageUrl, randomImage);

      return createPost(prisma, {
        index,
        content: getRandomElement(contents),
        description: getRandomElement(descriptions),
        imageUrl,
        ownerId: owner.id,
        mediaId: media.id,
      });
    }),
  );

  return posts;
};

const contents: string[] = [
  `
	Слухи прошлой недели нашли свое подтверждение в официальной рассылке. Вечером 21 января 2025 разработчик LightBurn уведомил некоторых своих клиентов о предстоящих изменениях. Покупатели из РФ и Беларуси больше не покупатели. Лицензии будут отозваны. Потраченные деньги конечно же никто не вернет. А времени осталось – до 24 января.
LightBurn – единственный пока вариант софта для работы с лазерными ЧПУ-станками, которым можно пользоваться в хорошем настроении и без рвотных рефлексов. Стандартный софт от производителей контроллеров Trocen AWC и Ruida такими качествами, к сожалению, не обладает. Софт платный и не очень дешевый. Но чего не сделаешь ради удобства работы. Можно и купить.
С уходом из РФ международных платежных систем покупка уже была не самой простой. Лицензии продавались на AliExpress, также был один реселлер в РФ. И там и там можно было приобрести лицензию за наши родные рубли. Казалось бы, всё хорошо терпимо. Но нет.
	`,

  `
	Что делать?
Научиться пользоваться VPN. Для тех, кто этим еще не владеет. Для активации новых ключей и скачивания обновлений.

Научиться пользоваться Application Firewall. Для тех, у кого уже установлен лицензионный LightBurn. Запретить ему глядеть, куда попало. Чтобы не лишиться активации в один прекрасный день.

В общем – окультуриваться. Придётся. Успехов.

	`,

  `
	Последние 10 лет я занимаюсь java разработкой и на протяжении всего этого времени Intellij Idea является неотъемлемой частью моей(да и многих других джавистов) работы. К сожалению некоторых вещей, которые были бы удобны лично мне, в ней нет, но к счастью есть возможность расширять IDE с помощью плагинов. На моём ноутбуке установлен linux и нет какой-то удобной нотификации событий из корпоративного календаря, а IDE практически всегда открыта на главном мониторе. По этой причине(а ещё из-за внезапно появившегося окна свободного времени и простого интереса) я решил, почему бы не интегрировать календарь прямо в IDE, чтобы получать нотификации и точно не пропустить ничего важного?
Об этом и пойдёт речь в статье.
	`,
];

const descriptions: string[] = [
  `
	Слухи прошлой недели нашли свое подтверждение в официальной рассылке. 
	`,
  `
	Нам сообщили, что содействие или разрешение этим активациям продолжаться из Беларуси и России может нарушать санкции США. Поэтому мы деактивируем все ключи с IP-адресами, происходящими из Беларуси и России, после 24.01.2025.
	`,
  `
	Последние 10 лет я занимаюсь java разработкой и на протяжении всего этого времени Intellij Idea является неотъемлемой частью моей(да и многих других джавистов) работы
	`,
];
