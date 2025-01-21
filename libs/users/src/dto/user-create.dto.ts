import { ApiProperty } from '@nestjs/swagger';
import { UserBaseDto } from './user-base.dto';
import { IsString } from 'class-validator';

export class UserCreateDto extends UserBaseDto {
  @ApiProperty({ type: String })
  @IsString()
  groupId: string;
}
