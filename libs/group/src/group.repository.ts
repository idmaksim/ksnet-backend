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
    const count = await this.prisma.group.count({
      where: { id },
    });

    return count > 0;
  }

  async count(searchDto: GroupSearchDto) {
    return this.prisma.group.count({
      where: mapSearch(searchDto.filters),
    });
  }
}
