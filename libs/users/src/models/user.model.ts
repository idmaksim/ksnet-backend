import { GroupModel } from '@app/group/models/group.model';
import { RoleModel } from '@app/role/models/role.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '@app/common/models/base.model';

@ObjectType()
export class UserModel extends BaseModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => RoleModel)
  role: RoleModel;

  @Field(() => GroupModel)
  group: GroupModel;
}
