import { ApiProperty, OmitType } from '@nestjs/swagger';
import { UserBaseDto } from './user-base.dto';
import { IsString } from 'class-validator';

export class UserCreateDto extends OmitType(UserBaseDto, ['username']) {
  @ApiProperty({ type: String })
  @IsString()
  groupId: string;
}
