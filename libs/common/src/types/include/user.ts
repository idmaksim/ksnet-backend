import { Prisma } from '@prisma/client';

export const USER_INCLUDE: Prisma.UserInclude = {
  likes: true,
  group: true,
  role: true,
  userMedias: {
    include: {
      media: true,
    },
  },
};

export const USER_SELECT: Prisma.UserSelect = {
  id: true,
  email: true,
  username: true,
  firstName: true,
  lastName: true,
  groupId: true,
  createdAt: true,
  updatedAt: true,
  group: true,
  userMedias: true,
  likes: true,
  role: true,
};
