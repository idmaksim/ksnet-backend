import { Injectable } from '@nestjs/common';
import { TopRepository } from './top.repository';
import { PostService } from '@app/post';
import { TopSearchDto } from './dto/top.search.dto';

@Injectable()
export class TopService {
  constructor(
    private readonly repository: TopRepository,
    private readonly postService: PostService,
  ) {}

  async search(data: TopSearchDto) {
    const topPostsIds = await this.repository.search(data);
    const topPosts = await this.postService.searchByIds(
      topPostsIds.map(({ id }) => id),
    );
    return topPosts;
  }
}
