import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TagSearchDto } from './dto/tag.search.dto';
import { mapPagination, mapSearch } from '@app/prisma';
import { mapSort } from '@app/prisma/sort.map';

@Injectable()
export class TagRepository {
  constructor(private readonly prisma: PrismaService) {}

  async search(dto: TagSearchDto) {
    return this.prisma.tag.findMany({
      where: mapSearch(dto.filters),
      orderBy: mapSort(dto.sort),
      ...mapPagination(dto.pagination),
    });
  }

  async count(dto: TagSearchDto) {
    return this.prisma.tag.count({
      where: mapSearch(dto.filters),
    });
  }

  async existsById(id: string) {
    const tag = await this.prisma.tag.findUnique({
      where: { id },
      select: { id: true },
    });

    return !!tag;
  }
}
