import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { I18nService } from 'nestjs-i18n';
import { PostSearchDto } from './dto/post.search.dto';
import { Post } from '@app/common/types/post';

@Injectable()
export class PostService {
  constructor(
    private readonly repository: PostRepository,
    private readonly i18n: I18nService,
  ) {}

  async search(data: PostSearchDto, userId: string) {
    const [rawPosts, totalCount] = await Promise.all([
      this.repository.search(data),
      this.repository.count(data),
    ]);
    const postsWithLikeStatus = await this.mapIsLike(rawPosts, userId);
    const postsWithLikeCount = await this.calculateLikes(postsWithLikeStatus);
    return { data: postsWithLikeCount, count: totalCount };
  }

  async ensureExistsById(id: string) {
    const exists = await this.repository.existsById(id);
    if (!exists) {
      throw new NotFoundException(this.i18n.t('errors.post.notFound'));
    }
  }

  private async mapIsLike(posts: Post[], userId: string) {
    return await Promise.all(
      posts.map(async (post) => {
        return {
          ...post,
          isLiked: post.likes.some((like) => like.userId === userId),
        };
      }),
    );
  }

  private async calculateLikes(posts: Post[]) {
    return await Promise.all(
      posts.map(async ({ likes, ...post }) => ({
        ...post,
        likes: likes.length,
      })),
    );
  }
}
