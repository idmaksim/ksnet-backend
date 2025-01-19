import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '@app/common/models/base.model';
import { UserModel } from '@app/users/models/user.model';

@ObjectType()
export class GroupModel extends BaseModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => [UserModel])
  users: UserModel[];
}
