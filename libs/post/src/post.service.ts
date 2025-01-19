import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class PostService {
  constructor(
    private readonly repository: PostRepository,
    private readonly i18n: I18nService,
  ) {}

  async ensureExistsById(id: string) {
    const exists = await this.repository.existsById(id);
    if (!exists) {
      throw new NotFoundException(this.i18n.t('errors.post.notFound'));
    }
  }
}
