import { Prisma } from '@prisma/client';

export const USER_INCLUDE = {
  likes: true,
  group: true,
  role: true,
  userMedias: {
    include: {
      media: true,
    },
  },
} satisfies Prisma.UserInclude;

export const USER_SELECT = {
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
} satisfies Prisma.UserSelect;
