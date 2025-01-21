import { Module } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { AvatarController } from './avatar.controller';
import { UsersModule } from '@app/users';
import { PermissionModule } from '@app/permissions';
import { AvatarRepository } from './avatar.repository';

@Module({
  imports: [UsersModule, PermissionModule],
  providers: [AvatarService, AvatarRepository],
  exports: [AvatarService, AvatarRepository],
  controllers: [AvatarController],
})
export class AvatarModule {}
