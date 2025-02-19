import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';

@Injectable()
export class LikeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async existsByUserIdAndPostId(userId: string, postId: string) {
    const count = await this.prisma.like.count({
      where: {
        userId,
        postId,
      },
    });

    return count > 0;
  }

  async existsById(id: string) {
    const count = await this.prisma.like.count({
      where: { id },
    });

    return count > 0;
  }
}
