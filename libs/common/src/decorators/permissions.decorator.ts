import { SetMetadata } from '@nestjs/common';
import { PermissionEnum } from '../constants/permission.enum';

export const HasPermissions = (...permissions: PermissionEnum[]) =>
  SetMetadata('permissions', permissions);
