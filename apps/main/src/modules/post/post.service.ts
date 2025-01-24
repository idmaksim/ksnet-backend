import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostCreateDto } from './dto/post.create.dto';
import { TagService } from '@app/tag';

@Injectable()
export class PostService {
  constructor(
    private readonly repository: PostRepository,
    private readonly tagService: TagService,
  ) {}

  private async validateTags(dto: PostCreateDto) {
    if (dto.tags) {
      await Promise.all(
        dto.tags.map((tag) => this.tagService.ensureExistsById(tag)),
      );
    }
  }

  async create(data: PostCreateDto, userId: string) {
    await this.validateTags(data);
    return this.repository.create(data, userId);
  }
}
