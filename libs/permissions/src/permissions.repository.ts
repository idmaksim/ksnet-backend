import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { PermissionSearchDto } from './dto/permission-search.dto';
import { mapPagination, mapSearch } from '@app/prisma';
import { mapSort } from '@app/prisma/sort.map';

@Injectable()
export class PermissionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: string) {
    return this.prisma.permission.findUnique({ where: { id } });
  }

  async search(dto: PermissionSearchDto) {
    return this.prisma.permission.findMany({
      where: mapSearch(dto.filters),
      orderBy: mapSort(dto.sorts),
      ...mapPagination(dto.pagination),
    });
  }

  async count(dto: PermissionSearchDto) {
    return this.prisma.permission.count({
      where: mapSearch(dto.filters),
    });
  }

  async findManyByRoleId(roleId: string) {
    return this.prisma.permission.findMany({
      where: { rolePermissions: { some: { roleId } } },
    });
  }

  async existsById(id: string): Promise<boolean> {
    const count = await this.prisma.permission.count({
      where: { id },
    });

    return count > 0;
  }

  async existsMany(ids: string[]): Promise<boolean> {
    const permissionExistsResults = await Promise.all(
      ids.map((id) => this.existsById(id)),
    );
    return permissionExistsResults.every((exists) => exists);
  }
}
