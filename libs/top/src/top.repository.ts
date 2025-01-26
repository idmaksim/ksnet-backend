import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { TopSearchDto } from './dto/top.search.dto';
import { mapPagination, mapSearch } from '@app/prisma';
import { mapSort } from '@app/prisma/sort.map';

@Injectable()
export class TopRepository {
  constructor(private readonly prisma: PrismaService) {}

  async search(dto: TopSearchDto) {
    return this.prisma.top.findMany({
      where: mapSearch(dto.filters),
      orderBy: mapSort(dto.sorts),
      select: {
        id: true,
      },
      ...mapPagination(dto.pagination),
    });
  }
}
