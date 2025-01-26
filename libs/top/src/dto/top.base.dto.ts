import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class TopBaseDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  place: number;
}
