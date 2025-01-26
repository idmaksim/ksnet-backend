import { Module } from '@nestjs/common';
import { TopController } from './top.controller';
import { TopService } from './top.service';
import { TopRepository } from './top.repository';

@Module({
  controllers: [TopController],
  providers: [TopService, TopRepository],
})
export class TopModule {}
