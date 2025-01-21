import { Prisma } from '@prisma/client';

export type User = Prisma.UserGetPayload<{
  include: {
    role: true;
  };
}>;

export type UserWithoutPassword = Omit<User, 'password'>;
