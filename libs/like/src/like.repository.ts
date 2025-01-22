import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';

@Injectable()
export class LikeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async existsByUserIdAndPostId(userId: string, postId: string) {
    const like = await this.prisma.like.findFirst({
      where: {
        userId,
        postId,
      },
      select: {
        id: true,
      },
    });

    return !!like;
  }

  async existsById(id: string) {
    const like = await this.prisma.like.findUnique({
      where: { id },
    });

    return !!like;
  }
}
