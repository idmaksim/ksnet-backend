import { ConflictException, Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostService as LibPostService } from '@app/post/post.service';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class PostService {
  constructor(
    private readonly repository: PostRepository,
    private readonly libService: LibPostService,
    private readonly i18n: I18nService,
  ) {}

  async removeFromTop(id: string) {
    await this.libService.ensureExistsById(id);
    return this.repository.removeFromTop(id);
  }

  async verify(id: string) {
    await this.libService.ensureExistsById(id);
    return this.repository.verify(id);
  }

  async addToTop(id: string, place: number) {
    await this.ensureNotInTop(id);
    await this.libService.ensureExistsById(id);
    return this.repository.addToTop(id, place);
  }

  async updateFakeLikes(id: string, fakeLikes: number) {
    await this.libService.ensureExistsById(id);
    return this.repository.updateFakeLikes(id, fakeLikes);
  }

  async ensureNotInTop(id: string) {
    const isInTop = await this.repository.alreadyInTop(id);
    if (isInTop) {
      throw new ConflictException(this.i18n.t('errors.post.alreadyInTop'));
    }
  }
}
