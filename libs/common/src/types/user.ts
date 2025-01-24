import { USER_INCLUDE } from './include/user';
import { Prisma } from '@prisma/client';

export type User = Prisma.UserGetPayload<{
  include: typeof USER_INCLUDE;
}>;

export type UserWithoutPassword = Omit<User, 'password'>;
