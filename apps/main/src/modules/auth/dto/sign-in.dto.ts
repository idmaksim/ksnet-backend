import { UserBaseDto } from '@app/users/dto/user-base.dto';
import { OmitType } from '@nestjs/swagger';

export class SignInDto extends OmitType(UserBaseDto, [
  'firstName',
  'lastName',
]) {}
