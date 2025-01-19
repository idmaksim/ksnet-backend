import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { GroupSearchDto } from './dto/group.search.dto';
import { getPagination, mapStringToSearch } from '@app/prisma';
import { mapSortToPrisma } from '@app/prisma/sort.base';

@Injectable()
export class GroupRepository {
  constructor(private readonly prisma: PrismaService) {}

  async search(searchDto: GroupSearchDto) {
    return this.prisma.group.findMany({
      where: mapStringToSearch(searchDto.filters),
      orderBy: mapSortToPrisma(searchDto.sort),
      ...getPagination(searchDto.pagination),
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
      where: mapStringToSearch(searchDto.filters),
    });
  }
}
