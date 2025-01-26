import { Controller, Post, Body } from '@nestjs/common';
import { TopService } from '@app/top';
import { TopSearchDto } from '@app/top/dto/top.search.dto';

@Controller('top')
export class TopController {
  constructor(private readonly service: TopService) {}

  @Post('search')
  async search(@Body() body: TopSearchDto) {
    return this.service.search(body);
  }
}
