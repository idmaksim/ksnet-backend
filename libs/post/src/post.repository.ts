import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PostSearchDto } from './dto/post.search.dto';
import { mapPagination, mapSearch } from '@app/prisma';
import { mapSort } from '@app/prisma/sort.map';
import { Prisma } from '@prisma/client';
import { POST_INCLUDE } from '@app/common/types/include/post';

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

  async findManyByUserId(userId: string) {
    return this.prisma.post.findMany({
      where: { ownerId: userId },
      select: { id: true },
    });
  }

  async delete(id: string) {
    return this.prisma.post.delete({
      where: { id },
    });
  }

  async search(data: PostSearchDto) {
    return this.prisma.post.findMany({
      where: PostRepository.buildWhere(data),
      include: POST_INCLUDE,
      orderBy: mapSort(data.sort),
      ...mapPagination(data.pagination),
    });
  }

  async count(data: PostSearchDto) {
    return this.prisma.post.count({
      where: PostRepository.buildWhere(data),
    });
  }

  static buildWhere(data: PostSearchDto): Prisma.PostWhereInput {
    const filters = { ...data.filters };
    const query = filters?.query;
    const isTop = filters?.isTop;

    delete filters?.query;
    delete filters?.tags;
    delete filters?.isTop;

    const searchConditions: Prisma.PostWhereInput[] = [];

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

    const where: Prisma.PostWhereInput = {
      ...mapSearch(filters, ['query', 'isTop']),
      ...(data.filters?.isVerified !== undefined
        ? { isVerified: data.filters?.isVerified }
        : {}),
      ...(isTop ? { tops: { some: { place: { gt: 0 } } } } : {}),
      ...(searchConditions.length > 0 ? { OR: searchConditions } : {}),
    };

    if (data.filters?.tags && data.filters.tags.length > 0) {
      const tagConditions = data.filters.tags.map((tagId) => ({
        postTags: {
          some: {
            tag: {
              id: tagId,
            },
          },
        },
      }));
      where.AND = Array.isArray(where.AND)
        ? [...where.AND, ...tagConditions]
        : [...(where.AND ? [where.AND] : []), ...tagConditions];
    }

    return where;
  }
}
