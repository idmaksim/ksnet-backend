import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GroupBaseDto {
  @ApiProperty({ example: 'Admin' })
  @IsString()
  name: string;
}
