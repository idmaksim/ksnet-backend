import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserBaseDto {
  @ApiProperty({ default: 'string@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  firstName: string;

  @ApiProperty({ type: String })
  @IsString()
  lastName: string;

  @ApiProperty({ type: String })
  @IsString()
  password: string;
}
