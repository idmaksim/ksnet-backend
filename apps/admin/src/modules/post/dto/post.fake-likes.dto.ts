import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PostUpdateFakeLikesDto {
  @ApiProperty()
  @IsNumber()
  fakeLikes: number;
}
