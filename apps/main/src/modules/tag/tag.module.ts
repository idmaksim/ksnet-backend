import { Module } from '@nestjs/common';
import { TagModule as LibTagModule } from '@app/tag';
import { TagController } from './tag.controller';

@Module({
  imports: [LibTagModule],
  providers: [],
  controllers: [TagController],
})
export class TagModule {}
