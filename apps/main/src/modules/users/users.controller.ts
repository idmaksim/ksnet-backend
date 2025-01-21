import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/common/guards/auth.guard';
import { DecodeUser } from '@app/common/decorators/decode-user.decorator';
import { UserWithoutPassword } from '@app/common/types/user';
import { UsersService } from '@app/users';

@Controller('users')
@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async me(@DecodeUser() user: UserWithoutPassword) {
    return user;
  }
}
