import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TagBaseDto {
  @ApiProperty({ type: String })
  @IsString()
  name: string;
}
