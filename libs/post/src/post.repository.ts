import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PostSearchDto } from './dto/post.search.dto';
import { getPagination, mapStringToSearch } from '@app/prisma';
import { mapSortToPrisma } from '@app/prisma/sort.base';
import { Prisma } from '@prisma/client';

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

  async search(data: PostSearchDto) {
    return this.prisma.post.findMany({
      where: this.buildWhere(data),
      include: {
        postTags: {
          include: {
            tag: true,
          },
        },
        postMedias: {
          include: {
            media: true,
          },
        },
        likes: true,
        owner: true,
      },
      orderBy: mapSortToPrisma(data.sort),
      ...getPagination(data.pagination),
    });
  }

  async count(data: PostSearchDto) {
    return this.prisma.post.count({
      where: this.buildWhere(data),
    });
  }

  private buildWhere(data: PostSearchDto): Prisma.PostWhereInput {
    const filters = { ...data.filters };
    const query = filters?.query;
    delete filters?.query;

    const searchConditions = [];

    if (query) {
      searchConditions.push(
        { description: { contains: query, mode: 'insensitive' } },
        { title: { contains: query, mode: 'insensitive' } },
        {
          postTags: {
            some: {
              tag: {
                name: { contains: query, mode: 'insensitive' },
              },
            },
          },
        },
      );
    }

    return {
      ...mapStringToSearch(filters, ['query']),
      ...(searchConditions.length > 0 ? { OR: searchConditions } : {}),
    };
  }
}
