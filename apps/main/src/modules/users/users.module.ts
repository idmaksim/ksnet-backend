import { Module } from '@nestjs/common';
import { UsersModule as LibUserModule } from '@app/users';
import { UsersResolver } from './users.resolver';
import { PermissionModule } from '@app/permissions';

@Module({
  imports: [LibUserModule, PermissionModule],
  providers: [UsersResolver],
})
export class UsersModule {}
