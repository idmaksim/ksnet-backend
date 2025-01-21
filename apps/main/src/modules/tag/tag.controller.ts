import { TagService } from '@app/tag';
import { TagSearchDto } from '@app/tag/dto/tag.search.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('tag')
@ApiTags('Tag')
export class TagController {
  constructor(private readonly service: TagService) {}

  @Post('search')
  async search(@Body() body: TagSearchDto) {
    return this.service.search(body);
  }
}
