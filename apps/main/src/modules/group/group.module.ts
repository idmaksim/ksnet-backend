import { Module } from '@nestjs/common';
import { GroupModule as LibGroupModule } from '@app/group';
import { UsersModule } from '@app/users';
import { PermissionModule } from '@app/permissions';
import { GroupResolver } from './group.resolver';

@Module({
  imports: [LibGroupModule, UsersModule, PermissionModule],
  providers: [GroupResolver],
})
export class GroupModule {}
