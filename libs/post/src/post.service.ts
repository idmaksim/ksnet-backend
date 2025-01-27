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

  async delete(id: string) {
    await this.ensureExistsById(id);
    return this.repository.delete(id);
  }

  async findManyByUserId(userId: string) {
    const posts = await this.repository.findManyByUserId(userId);
    if (!posts.length) {
      throw new NotFoundException(this.i18n.t('errors.post.notFoundMany'));
    }
    return posts;
  }

  async search(data: PostSearchDto) {
    const [rawPosts, count] = await Promise.all([
      this.repository.search(data),
      this.repository.count(data),
    ]);
    const postsWithLikeCount = await this.mapAdditionalFields(rawPosts);
    return { data: postsWithLikeCount, count };
  }

  async ensureExistsById(id: string) {
    const exists = await this.repository.existsById(id);
    if (!exists) {
      throw new NotFoundException(this.i18n.t('errors.post.notFound'));
    }
  }

  private async mapAdditionalFields(posts: Post[]): Promise<PostWithLikes[]> {
    const postsWithLikeCount = await this.calculateLikes(posts);
    const postsWithFakeLikesCount =
      await this.calculateFakeLikes(postsWithLikeCount);
    return postsWithFakeLikesCount;
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
