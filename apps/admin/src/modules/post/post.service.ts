import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostService as LibPostService } from '@app/post/post.service';

@Injectable()
export class PostService {
  constructor(
    private readonly repository: PostRepository,
    private readonly libService: LibPostService,
  ) {}

  async verify(id: string) {
    await this.libService.ensureExistsById(id);
    return this.repository.verify(id);
  }

  async updateFakeLikes(id: string, fakeLikes: number) {
    await this.libService.ensureExistsById(id);
    return this.repository.updateFakeLikes(id, fakeLikes);
  }
}
