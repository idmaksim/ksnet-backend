import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class GroupBaseDto {
  @ApiProperty({ example: 'Admin' })
  @Field(() => String)
  @IsString()
  name: string;
}
