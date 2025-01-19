import { UserBaseDto } from '@app/users/dto/user-base.dto';
import { InputType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/swagger';

@InputType()
export class SignInDto extends OmitType(UserBaseDto, [
  'firstName',
  'lastName',
]) {}
