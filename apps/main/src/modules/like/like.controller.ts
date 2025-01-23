import { Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { JwtAuthGuard } from '@app/common/guards/auth.guard';
import { ActiveGuard, DecodeUser, PermissionGuard, User } from '@app/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('like')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, ActiveGuard, PermissionGuard)
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post(':postId')
  async like(@Param('postId') postId: string, @DecodeUser() user: User) {
    return this.likeService.create(user.id, postId);
  }

  @Delete(':postId')
  async delete(@Param('postId') postId: string, @DecodeUser() user: User) {
    return this.likeService.delete(user.id, postId);
  }
}
