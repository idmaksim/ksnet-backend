import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async verify(id: string, isVerified: boolean) {
    return this.prisma.post.update({
      where: { id },
      data: { isVerified },
    });
  }
}
