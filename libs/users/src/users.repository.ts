import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { PrismaService } from '@app/prisma/prisma.service';
import { BaseRoleEnum } from '@app/common/constants/base-roles.enum';
import { USER_INCLUDE, USER_SELECT } from '@app/common/types/include/user';
import { mapPagination, mapSearch } from '@app/prisma';
import { mapSort } from '@app/prisma/sort.map';
import { UserSearchDto } from './dto/user.search.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: USER_INCLUDE,
    });
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: USER_INCLUDE,
    });
  }

  async findOneByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
      include: USER_INCLUDE,
    });
  }

  async search(dto: UserSearchDto) {
    return this.prisma.user.findMany({
      where: mapSearch(dto.filters),
      orderBy: mapSort(dto.sort),
      ...mapPagination(dto.pagination),
      select: USER_SELECT,
    });
  }

  async count(dto: UserSearchDto) {
    return this.prisma.user.count({
      where: mapSearch(dto.filters),
    });
  }

  async create({ groupId, ...dto }: UserCreateDto & { username: string }) {
    return this.prisma.user.create({
      data: {
        ...dto,
        group: {
          connect: {
            id: groupId,
          },
        },
        role: {
          connect: {
            name: BaseRoleEnum.Guest,
          },
        },
      },
      include: USER_INCLUDE,
    });
  }

  async existsById(id: string) {
    return !!(await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
      },
    }));
  }

  async existsByEmail(email: string) {
    return !!(await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
      },
    }));
  }
}
