import { Field, ObjectType } from '@nestjs/graphql';
import { TagModel } from '../models/tag.model';

@ObjectType()
export class TagSearchResponse {
  @Field(() => [TagModel])
  data: TagModel[];

  @Field(() => Number)
  count: number;
}
