import { ApiProperty, OmitType } from '@nestjs/swagger';
import { UserBaseDto } from './user-base.dto';
import { IsString, IsUUID } from 'class-validator';

export class UserCreateDto extends OmitType(UserBaseDto, ['username']) {
  @ApiProperty({ type: String })
  @IsUUID('4')
  groupId: string;
}
