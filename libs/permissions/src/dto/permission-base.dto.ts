import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PermissionBaseDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  title: string;
}
