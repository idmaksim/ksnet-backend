import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersModule as LibUsersModule } from '@app/users';
import { PermissionModule } from '@app/permissions';

@Module({
  imports: [LibUsersModule, PermissionModule],
  controllers: [UsersController],
})
export class UsersModule {}
