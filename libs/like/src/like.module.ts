import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { PrismaModule } from '@app/prisma/prisma.module';
import { LikeRepository } from './like.repository';

@Module({
  imports: [PrismaModule],
  providers: [LikeService, LikeRepository],
  exports: [LikeService],
})
export class LikeModule {}
