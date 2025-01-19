import { BaseModel } from '@app/common/models/base.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TagModel extends BaseModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;
}
