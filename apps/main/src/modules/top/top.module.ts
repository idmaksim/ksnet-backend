import { Module } from '@nestjs/common';
import { TopController } from './top.controller';
import { TopModule as LibTopModule } from '@app/top';

@Module({
  imports: [LibTopModule],
  controllers: [TopController],
})
export class TopModule {}
