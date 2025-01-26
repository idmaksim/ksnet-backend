import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class PostVerifyDto {
  @ApiProperty()
  @IsBoolean()
  isVerified: boolean;
}
