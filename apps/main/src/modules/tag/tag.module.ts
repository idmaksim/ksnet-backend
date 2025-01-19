import { Module } from '@nestjs/common';
import { TagResolver } from './tag.resolver';
import { TagModule as LibTagModule } from '@app/tag';

@Module({
  imports: [LibTagModule],
  providers: [TagResolver],
})
export class TagModule {}
