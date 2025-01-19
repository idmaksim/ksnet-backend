import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagRepository } from './tag.repository';
import { PrismaModule } from '@app/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TagService, TagRepository],
  exports: [TagService],
})
export class TagModule {}
