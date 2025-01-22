import { Prisma } from '@prisma/client';

export type Post = Prisma.PostGetPayload<{
  include: {
    postTags: {
      include: {
        tag: true;
      };
    };
    likes: true;
    owner: true;
  };
}>;
