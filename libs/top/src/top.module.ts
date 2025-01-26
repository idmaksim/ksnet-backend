import { Module } from '@nestjs/common';
import { TopService } from './top.service';
import { TopRepository } from './top.repository';
import { PostModule } from '@app/post';
import { PrismaModule } from '@app/prisma/prisma.module';

@Module({
  imports: [PostModule, PrismaModule],
  providers: [TopService, TopRepository],
  exports: [TopService],
})
export class TopModule {}
