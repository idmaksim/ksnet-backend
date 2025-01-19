import { PrismaClient } from '@prisma/client';

export const groupSeed = async (prisma: PrismaClient) => {
  const data = await fetch(
    'https://www.ks54.ru/lk/include/api.php?action=grouplist',
  );

  const json = await data.json();

  const groupList = json.grouplist;

  Object.keys(groupList).forEach(async (key) => {
    const groups = groupList[key];
    await prisma.group.createMany({
      data: groups.map((group) => {
        return {
          name: group,
        };
      }),
    });
  });
};
