import { IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TagBaseDto {
  @IsString()
  @Field(() => String)
  name: string;
}
