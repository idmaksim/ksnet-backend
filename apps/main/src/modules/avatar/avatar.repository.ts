import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { MediaType } from '@prisma/client';

@Injectable()
export class AvatarRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deleteIfExists(userId: string) {
    const avatar = await this.prisma.media.findFirst({
      where: {
        type: MediaType.AVATAR,
        userMedias: { some: { userId } },
      },
    });

    if (avatar) {
      return this.prisma.media.delete({ where: { id: avatar?.id } });
    }
  }

  async create(userId: string, url: string, filename: string) {
    return this.prisma.media.create({
      data: {
        type: MediaType.AVATAR,
        url,
        filename,
        userMedias: {
          create: {
            userId,
          },
        },
      },
    });
  }

  async existsByUserId(userId: string) {
    const count = await this.prisma.media.count({
      where: {
        type: MediaType.AVATAR,
        userMedias: { some: { userId } },
      },
    });

    return count > 0;
  }
}
