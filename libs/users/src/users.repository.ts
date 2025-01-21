import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@app/prisma/prisma.service';
import { BaseRoleEnum } from '@app/common/constants/base-roles.enum';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: this.getInclude(),
    });
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: this.getInclude(),
    });
  }

  async create({ groupId, ...dto }: UserCreateDto) {
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
      include: this.getInclude(),
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

  private getInclude(): Prisma.UserInclude {
    return {
      role: true,
      group: true,
      comments: true,
      likes: true,
      posts: true,
      userMedias: {
        include: {
          media: true,
        },
      },
    };
  }
}
