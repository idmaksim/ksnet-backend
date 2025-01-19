import { Prisma } from '@prisma/client';

export type User = Prisma.UserGetPayload<{
  include: {
    role: {
      include: {
        rolePermissions: {
          include: {
            permission: true;
          };
        };
      };
    };
    group: true;
    comments: true;
    likes: true;
    posts: true;
    userMedias: {
      include: {
        media: true;
      };
    };
  };
}>;

export type UserWithoutPassword = Omit<User, 'password'>;
