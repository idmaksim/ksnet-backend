import { I18nModule, I18nService } from 'nestjs-i18n';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TagSearchDto } from './dto/tag.search.dto';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {
  constructor(
    private readonly tagRepository: TagRepository,
    private readonly i18n: I18nService,
  ) {}

  async search(dto: TagSearchDto) {
    const [data, count] = await Promise.all([
      this.tagRepository.search(dto),
      this.tagRepository.count(dto),
    ]);

    return { data, count };
  }

  async ensureExistsById(id: string) {
    const tag = await this.tagRepository.existsById(id);
    if (!tag) {
      throw new NotFoundException(this.i18n.t('errors.tag.notFound'));
    }
  }
}
