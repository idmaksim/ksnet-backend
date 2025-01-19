import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseSearchResponse {
  @Field(() => Number)
  count: number;
}
