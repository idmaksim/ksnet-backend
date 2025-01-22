import { Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { JwtAuthGuard } from '@app/common/guards/auth.guard';
import { ActiveGuard, DecodeUser, PermissionGuard, User } from '@app/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CanDeleteGuard } from './guards/can-delete.guard';

@Controller('like')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, ActiveGuard, PermissionGuard)
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post(':postId')
  async like(@Param('postId') postId: string, @DecodeUser() user: User) {
    return this.likeService.create(user.id, postId);
  }

  @Delete(':id')
  @UseGuards(CanDeleteGuard)
  async delete(@Param('id') id: string) {
    return this.likeService.delete(id);
  }
}
