import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async verify(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      select: {
        isVerified: true,
      },
    });
    return this.prisma.post.update({
      where: { id },
      data: { isVerified: !post.isVerified },
    });
  }

  async updateFakeLikes(id: string, fakeLikes: number) {
    return this.prisma.post.update({
      where: { id },
      data: { fakeLikes },
    });
  }
}
