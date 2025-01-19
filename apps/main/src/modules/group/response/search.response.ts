import { BaseSearchResponse } from '@app/common/base/search-response.base';
import { GroupModel } from '@app/group/models/group.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GroupSearchResponse extends BaseSearchResponse {
  @Field(() => [GroupModel])
  data: GroupModel[];
}
