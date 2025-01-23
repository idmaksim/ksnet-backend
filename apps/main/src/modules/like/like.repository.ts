import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LikeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, postId: string) {
    return this.prisma.like.create({
      data: {
        userId,
        postId,
      },
    });
  }

  async findOneById(id: string) {
    return this.prisma.like.findUnique({
      where: { id },
    });
  }

  async delete(userId: string, postId: string) {
    return this.prisma.like.deleteMany({
      where: { userId, postId },
    });
  }
}
