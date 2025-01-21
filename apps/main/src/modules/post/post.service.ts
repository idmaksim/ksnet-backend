import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostCreateDto } from './dto/post.create.dto';

@Injectable()
export class PostService {
  constructor(private readonly repository: PostRepository) {}

  async create(data: PostCreateDto, userId: string) {
    return this.repository.create(data, userId);
  }
}
