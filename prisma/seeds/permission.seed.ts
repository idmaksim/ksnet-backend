import { PrismaClient } from '@prisma/client';
import {
  PermissionEnum,
  PermissionTitles,
} from '../../libs/common/src/constants/permission.enum';

export async function seedPermission(prisma: PrismaClient) {
  const permissions = Object.values(PermissionEnum);
  for (const role of permissions) {
    await prisma.permission.create({
      data: { name: role, title: PermissionTitles[role] },
    });
  }
}
