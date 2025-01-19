import { Args, Query, Resolver } from '@nestjs/graphql';
import { TagService } from '@app/tag';
import { TagModel } from '@app/tag/models/tag.model';
import { TagSearchResponse } from '@app/tag/response/search.response';
import { TagSearchDto } from '@app/tag/dto/tag.search.dto';

@Resolver(() => TagModel)
export class TagResolver {
  constructor(private readonly libService: TagService) {}

  @Query(() => TagSearchResponse)
  async tags(@Args('search') search: TagSearchDto) {
    return this.libService.search(search);
  }
}
