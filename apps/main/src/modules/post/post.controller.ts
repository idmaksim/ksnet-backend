import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ActiveGuard,
  DecodeUser,
  JwtAuthGuard,
  PermissionGuard,
  User,
} from '@app/common';
import { PostCreateDto } from './dto/post.create.dto';
import { PostSearchDto } from '@app/post/dto/post.search.dto';
import { PostService as LibPostService } from '@app/post/post.service';

@Controller('post')
@ApiTags('Post')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, ActiveGuard, PermissionGuard)
export class PostController {
  constructor(
    private readonly service: PostService,
    private readonly libService: LibPostService,
  ) {}

  @Post()
  async create(@Body() body: PostCreateDto, @DecodeUser() user: User) {
    return this.service.create(body, user.id);
  }

  @Post('search')
  async search(@Body() body: PostSearchDto) {
    return this.libService.search(body);
  }
}
