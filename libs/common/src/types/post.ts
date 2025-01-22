import { Prisma } from '@prisma/client';

export type Post = Prisma.PostGetPayload<{
  include: {
    postTags: {
      select: {
        tag: {
          select: {
            name: true;
            id: true;
          };
        };
      };
    };
    postMedias: {
      select: {
        media: {
          select: {
            url: true;
            id: true;
          };
        };
      };
    };
    likes: true;
    owner: {
      select: {
        id: true;
        firstName: true;
        userMedias: {
          select: {
            media: {
              select: {
                url: true;
              };
            };
          };
        };
        lastName: true;
      };
    };
  };
}>;
