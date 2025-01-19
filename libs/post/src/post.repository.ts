import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async existsById(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      select: { id: true },
    });
    return !!post;
  }
}
