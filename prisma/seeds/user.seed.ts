import { BaseRoleEnum } from '../../libs/common/src/constants/base-roles.enum';
import { PrismaClient } from '@prisma/client';

export const seedUser = async (prisma: PrismaClient) => {
  await prisma.user.create({
    data: {
      email: 'string@gmail.com',
      firstName: 'string',
      lastName: 'string',
      username: 'string_string_123',
      group: {
        create: {
          name: '2-ИСП9-43',
        },
      },
      password: '$2a$04$3EuFgtfrKleWTT2lHiioTOfk7d6r0vz.B.Scf4rKGEaJSQ6bfiFBi',
      isActive: true,
      role: {
        connect: {
          name: BaseRoleEnum.Admin,
        },
      },
    },
  });

  const group = await prisma.group.findFirst({});

  await prisma.user.create({
    data: {
      email: 'string2@gmail.com',
      firstName: 'string2',
      lastName: 'string2',
      username: 'string2_string2_123',
      group: {
        connect: {
          id: group.id,
        },
      },
      password: '$2a$04$3EuFgtfrKleWTT2lHiioTOfk7d6r0vz.B.Scf4rKGEaJSQ6bfiFBi',
      isActive: true,
      role: {
        connect: {
          name: BaseRoleEnum.User,
        },
      },
    },
  });
};
