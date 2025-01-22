import { Injectable, NotFoundException } from '@nestjs/common';
import { LikeService as LibLikeService } from '@app/like';
import { LikeRepository } from './like.repository';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class LikeService {
  constructor(
    private readonly libLikeService: LibLikeService,
    private readonly likeRepository: LikeRepository,
    private readonly i18n: I18nService,
  ) {}

  async create(userId: string, postId: string) {
    await this.libLikeService.ensureExistsByUserIdAndPostId(userId, postId);
    return this.likeRepository.create(userId, postId);
  }

  async delete(id: string) {
    await this.libLikeService.ensureExistsById(id);
    return this.likeRepository.delete(id);
  }

  async findOneById(id: string) {
    const like = await this.likeRepository.findOneById(id);
    if (!like) {
      throw new NotFoundException(this.i18n.t('errors.like.notFound'));
    }
    return like;
  }
}
