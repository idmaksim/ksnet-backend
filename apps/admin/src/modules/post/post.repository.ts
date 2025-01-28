import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async removeFromTop(id: string) {
    return this.prisma.top.deleteMany({
      where: { postId: id },
    });
  }

  async placeIsFree(place: number) {
    const top = await this.prisma.top.findFirst({
      where: { place },
    });
    return !top;
  }

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

  async addToTop(id: string, place: number) {
    return this.prisma.top.create({
      data: {
        postId: id,
        place: place,
      },
    });
  }

  async alreadyInTop(id: string) {
    const top = await this.prisma.top.findFirst({
      where: { postId: id },
    });
    return !!top;
  }

  async updateFakeLikes(id: string, fakeLikes: number) {
    return this.prisma.post.update({
      where: { id },
      data: { fakeLikes },
    });
  }
}
