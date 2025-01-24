import { POST_INCLUDE } from './include/post';
import { Prisma } from '@prisma/client';

export type Post = Prisma.PostGetPayload<{
  include: typeof POST_INCLUDE;
}>;
