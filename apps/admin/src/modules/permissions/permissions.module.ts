import { Module } from '@nestjs/common';
import { PermissionController } from './permissions.controller';
import { PermissionModule as LibPermissionModule } from '@app/permissions';

@Module({
  imports: [LibPermissionModule],
  controllers: [PermissionController],
})
export class PermissionsModule {}
