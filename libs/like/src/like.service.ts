import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly i18n: I18nService,
  ) {}

  async ensureAlreadyExistsByUserIdAndPostId(userId: string, postId: string) {
    const exists = await this.likeRepository.existsByUserIdAndPostId(
      userId,
      postId,
    );

    if (!exists) {
      throw new NotFoundException(this.i18n.t('errors.like.notFound'));
    }
  }

  async ensureExistsByUserIdAndPostId(userId: string, postId: string) {
    const exists = await this.likeRepository.existsByUserIdAndPostId(
      userId,
      postId,
    );

    if (exists) {
      throw new ConflictException(this.i18n.t('errors.like.alreadyExists'));
    }
  }

  async ensureExistsById(id: string) {
    const exists = await this.likeRepository.existsById(id);

    if (!exists) {
      throw new NotFoundException(this.i18n.t('errors.like.notFound'));
    }
  }
}
