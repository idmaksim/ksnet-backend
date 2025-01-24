import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { GroupSearchDto } from './dto/group.search.dto';
import { mapPagination, mapSearch } from '@app/prisma';
import { mapSort } from '@app/prisma/sort.map';

@Injectable()
export class GroupRepository {
  constructor(private readonly prisma: PrismaService) {}

  async search(searchDto: GroupSearchDto) {
    return this.prisma.group.findMany({
      where: mapSearch(searchDto.filters),
      orderBy: mapSort(searchDto.sort),
      ...mapPagination(searchDto.pagination),
    });
  }

  async existsById(id: string) {
    const exists = await this.prisma.group.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });

    return !!exists;
  }

  async count(searchDto: GroupSearchDto) {
    return this.prisma.group.count({
      where: mapSearch(searchDto.filters),
    });
  }
}
