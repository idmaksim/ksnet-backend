import { Module } from '@nestjs/common';
import { GroupModule as LibGroupModule } from '@app/group';
import { UsersModule } from '@app/users';
import { PermissionModule } from '@app/permissions';
import { GroupController } from './group.controller';

@Module({
  imports: [LibGroupModule, UsersModule, PermissionModule],
  providers: [],
  controllers: [GroupController],
})
export class GroupModule {}
