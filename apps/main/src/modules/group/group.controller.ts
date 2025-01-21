import { GroupService } from '@app/group';
import { GroupSearchDto } from '@app/group/dto/group.search.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('group')
@ApiTags('Group')
export class GroupController {
  constructor(private readonly service: GroupService) {}

  @Post('search')
  async search(@Body() body: GroupSearchDto) {
    return this.service.search(body);
  }
}
