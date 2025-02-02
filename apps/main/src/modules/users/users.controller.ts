import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/common/guards/auth.guard';
import { DecodeUser } from '@app/common/decorators/decode-user.decorator';
import { UserWithoutPassword } from '@app/common/types/user';
import { UsersService } from '@app/users';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async me(@DecodeUser() user: UserWithoutPassword) {
    return user;
  }

  @Get(':username')
  async findOneByUsername(@Param('username') username: string) {
    return this.usersService.findOneByUsername(username);
  }
}
