import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ActiveGuard,
  DecodeUser,
  HasPermissions,
  JwtAuthGuard,
  PermissionEnum,
  PermissionGuard,
  User,
} from '@app/common';
import { PostCreateDto } from './dto/post.create.dto';
import { PostSearchDto } from '@app/post/dto/post.search.dto';
import { PostService as LibPostService } from '@app/post/post.service';
import { CanDeleteGuard } from './guards/can-delete.guard';

@Controller('post')
@ApiTags('Post')
export class PostController {
  constructor(
    private readonly service: PostService,
    private readonly libService: LibPostService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionGuard)
  async create(@Body() body: PostCreateDto, @DecodeUser() user: User) {
    return this.service.create(body, user.id);
  }

  @Post('search')
  async search(@Body() body: PostSearchDto) {
    return this.libService.search({
      ...body,
      filters: { ...body.filters, isVerified: true },
    });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @HasPermissions(PermissionEnum.PostDelete)
  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionGuard, CanDeleteGuard)
  async delete(@Param('id') id: string) {
    return this.libService.delete(id);
  }
}
