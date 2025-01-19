import { Injectable, NotFoundException } from '@nestjs/common';
import { GroupRepository } from './group.repository';
import { GroupSearchDto } from './dto/group.search.dto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class GroupService {
  constructor(
    private readonly repository: GroupRepository,
    private readonly i18n: I18nService,
  ) {}

  async search(searchDto: GroupSearchDto) {
    const [data, count] = await Promise.all([
      this.repository.search(searchDto),
      this.repository.count(searchDto),
    ]);

    return { data, count };
  }

  async ensureExistsById(id: string) {
    const exists = await this.repository.existsById(id);

    if (!exists) {
      throw new NotFoundException(this.i18n.t('errors.group.notFound'));
    }
  }
}
