import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TagSearchDto } from './dto/tag.search.dto';
import { getPagination, mapStringToSearch } from '@app/prisma';
import { mapSortToPrisma } from '@app/prisma/sort.base';

@Injectable()
export class TagRepository {
  constructor(private readonly prisma: PrismaService) {}

  async search(dto: TagSearchDto) {
    return this.prisma.tag.findMany({
      where: mapStringToSearch(dto.filters),
      orderBy: mapSortToPrisma(dto.sort),
      ...getPagination(dto.pagination),
    });
  }

  async count(dto: TagSearchDto) {
    return this.prisma.tag.count({
      where: mapStringToSearch(dto.filters),
    });
  }
}
