import {
  S3Client,
  ListObjectsV2Command,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.S3_REGION,
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

export const avatarSeed = async () => {
  const listParams = {
    Bucket: process.env.S3_BUCKET_NAME,
  };

  try {
    const listedObjects = await s3Client.send(
      new ListObjectsV2Command(listParams),
    );

    if (listedObjects.Contents?.length > 0) {
      const deleteParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Delete: {
          Objects: listedObjects.Contents.map(({ Key }) => ({ Key })),
        },
      };

      await s3Client.send(new DeleteObjectsCommand(deleteParams));
    }
  } catch (error) {
    console.error('Ошибка при удалении файлов из S3:', error);
  }
};
