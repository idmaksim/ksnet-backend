import { GroupModel } from '@app/group/models/group.model';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GroupService as LibGroupService } from '@app/group';
import { GroupSearchDto } from '@app/group/dto/group.search.dto';
import { GroupSearchResponse } from './response/search.response';

@Resolver(() => GroupModel)
export class GroupResolver {
  constructor(private readonly libService: LibGroupService) {}

  @Query(() => GroupSearchResponse)
  async groups(@Args('search') search: GroupSearchDto) {
    return this.libService.search(search);
  }
}
