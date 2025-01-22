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
          select: {
            tag: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
        postMedias: {
          select: {
            media: {
              select: {
                url: true,
                id: true,
              },
            },
          },
        },
        likes: true,
        owner: {
          select: {
            id: true,
            firstName: true,
            userMedias: {
              select: {
                media: {
                  select: {
                    url: true,
                  },
                },
              },
            },
            lastName: true,
          },
        },
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
    delete filters?.tags;

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

    const where: Prisma.PostWhereInput = {
      ...mapStringToSearch(filters, ['query']),
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
