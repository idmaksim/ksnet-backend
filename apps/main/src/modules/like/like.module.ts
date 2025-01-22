import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { UsersModule } from '@app/users';
import { PermissionModule } from '@app/permissions';
import { LikeRepository } from './like.repository';
import { LikeModule as LibLikeModule } from '@app/like';
import { PrismaModule } from '@app/prisma/prisma.module';

@Module({
  controllers: [LikeController],
  providers: [LikeService, LikeRepository],
  imports: [UsersModule, PermissionModule, LibLikeModule, PrismaModule],
})
export class LikeModule {}
