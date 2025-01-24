import { Prisma } from '@prisma/client';

export const USER_INCLUDE: Prisma.UserInclude = {
  likes: true,
  userMedias: {
    include: {
      media: true,
    },
  },
};
