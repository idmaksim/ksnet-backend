import { Prisma } from '@prisma/client';

export const POST_INCLUDE: Prisma.PostInclude = {
  postTags: {
    select: {
      tag: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  },
  postMedias: {
    select: {
      media: {
        select: {
          url: true,
          id: true,
        },
      },
    },
  },
  likes: {
    select: {
      userId: true,
    },
  },
  owner: {
    select: {
      id: true,
      firstName: true,
      userMedias: {
        select: {
          media: {
            select: {
              url: true,
            },
          },
        },
      },
      lastName: true,
    },
  },
};
