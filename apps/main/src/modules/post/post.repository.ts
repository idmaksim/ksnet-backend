import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PostCreateDto } from './dto/post.create.dto';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: PostCreateDto, userId: string) {
    return this.prisma.post.create({
      data: {
        ...data,
        ownerId: userId,
        postTags: data.tags
          ? {
              createMany: {
                data: data.tags.map((tagId) => ({
                  tagId: tagId,
                })),
              },
            }
          : undefined,
      },
    });
  }
}
