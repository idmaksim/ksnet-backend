import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';

import { IsString } from 'class-validator';

@InputType()
export class PostBaseDto {
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  description?: string;

  @IsString()
  @Field(() => String)
  content: string;

  @IsString()
  @Field(() => String)
  title: string;

  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;
}
