import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { PostSearchDto } from '@app/post/dto/post.search.dto';
import { PostService as LibPostService } from '@app/post/post.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/common';
import { ActiveGuard } from '@app/common';
import { PermissionGuard } from '@app/common';

@Controller('post')
@ApiTags('Post')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, ActiveGuard, PermissionGuard)
export class PostController {
  constructor(
    private readonly service: PostService,
    private readonly libService: LibPostService,
  ) {}

  @Post('search')
  async search(@Body() body: PostSearchDto) {
    return this.libService.search(body);
  }
}
