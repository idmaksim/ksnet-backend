import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostSearchDto } from '@app/post/dto/post.search.dto';
import { PostService as LibPostService } from '@app/post/post.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { HasPermissions, JwtAuthGuard, PermissionEnum } from '@app/common';
import { ActiveGuard } from '@app/common';
import { PermissionGuard } from '@app/common';
import { PostVerifyDto } from './dto/post.verify.dto';
import { PostUpdateFakeLikesDto } from './dto/post.fake-likes.dto';
import { PostAddToTopDto } from './dto/post.add-to-top.dto';

@Controller('post')
@ApiTags('Post')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, ActiveGuard, PermissionGuard)
export class PostController {
  constructor(
    private readonly service: PostService,
    private readonly libService: LibPostService,
  ) {}

  @Delete(':id')
  @HasPermissions(PermissionEnum.PostDelete)
  async delete(@Param('id') id: string) {
    return this.libService.delete(id);
  }

  @Post('search')
  async search(@Body() body: PostSearchDto) {
    return this.libService.search(body);
  }

  @Put(':id/verify')
  @HasPermissions(PermissionEnum.PostVerify)
  async verify(@Param('id') id: string) {
    return this.service.verify(id);
  }

  @Post(':id/add-to-top')
  @HasPermissions(PermissionEnum.PostAddToTop)
  async addToTop(@Param('id') id: string, @Body() body: PostAddToTopDto) {
    return this.service.addToTop(id, body.place);
  }

  @Delete(':id/remove-from-top')
  @HasPermissions(PermissionEnum.PostRemoveFromTop)
  async removeFromTop(@Param('id') id: string) {
    return this.service.removeFromTop(id);
  }

  @Post(':id/update-fake-likes')
  @HasPermissions(PermissionEnum.PostUpdateFakeLikes)
  async updateFakeLikes(
    @Param('id') id: string,
    @Body() body: PostUpdateFakeLikesDto,
  ) {
    return this.service.updateFakeLikes(id, body.fakeLikes);
  }
}
