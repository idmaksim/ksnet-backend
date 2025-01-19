import { ApiProperty } from '@nestjs/swagger';
import { UserBaseDto } from './user-base.dto';
import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UserCreateDto extends UserBaseDto {
  @ApiProperty()
  @Field(() => String)
  @IsString()
  groupId: string;
}
