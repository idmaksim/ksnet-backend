import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { I18nService } from 'nestjs-i18n';
import { PostSearchDto } from './dto/post.search.dto';
import { Post, PostWithLikes } from '@app/common/types/post';

@Injectable()
export class PostService {
  constructor(
    private readonly repository: PostRepository,
    private readonly i18n: I18nService,
  ) {}

  async search(data: PostSearchDto) {
    const [rawPosts, totalCount] = await Promise.all([
      this.repository.search(data),
      this.repository.count(data),
    ]);
    const postsWithLikeCount = await this.calculateLikes(rawPosts);
    const postsWithFakeLikesCount =
      await this.calculateFakeLikes(postsWithLikeCount);
    return { data: postsWithFakeLikesCount, count: totalCount };
  }

  async ensureExistsById(id: string) {
    const exists = await this.repository.existsById(id);
    if (!exists) {
      throw new NotFoundException(this.i18n.t('errors.post.notFound'));
    }
  }

  private async calculateLikes(posts: Post[]): Promise<PostWithLikes[]> {
    return await Promise.all(
      posts.map(async (post) => ({
        ...post,
        likesCount: post.likes.length,
      })),
    );
  }

  private async calculateFakeLikes(posts: PostWithLikes[]) {
    return await Promise.all(
      posts.map(async (post) => ({
        ...post,
        likesCount: post.likesCount + post.fakeLikes,
        fakeLikes: undefined,
      })),
    );
  }
}
