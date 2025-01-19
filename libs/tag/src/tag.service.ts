import { Injectable } from '@nestjs/common';
import { TagSearchDto } from './dto/tag.search.dto';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async search(dto: TagSearchDto) {
    const [data, count] = await Promise.all([
      this.tagRepository.search(dto),
      this.tagRepository.count(dto),
    ]);

    return { data, count };
  }
}
