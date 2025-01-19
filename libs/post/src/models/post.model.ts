import { UserModel } from '@app/users/models/user.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => UserModel)
  owner: UserModel;

  @Field(() => Boolean)
  isVerified: boolean;

  @Field(() => String)
  description: string;

  @Field(() => String)
  content: string;
}
