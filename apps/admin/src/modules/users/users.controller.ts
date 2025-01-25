import {
  ActiveGuard,
  HasPermissions,
  JwtAuthGuard,
  PermissionEnum,
  PermissionGuard,
} from '@app/common';
import { UsersService as LibUsersService } from '@app/users';
import { UserSearchDto } from '@app/users/dto/user.search.dto';
import { Body, Controller, UseGuards, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, ActiveGuard, PermissionGuard)
export class UsersController {
  constructor(private readonly libService: LibUsersService) {}

  @Post('search')
  @HasPermissions(PermissionEnum.UserSearch)
  async search(@Body() dto: UserSearchDto) {
    return this.libService.search(dto);
  }
}
