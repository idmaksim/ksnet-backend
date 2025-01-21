import { forwardRef, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { PermissionModule } from '@app/permissions';
import { RoleRepository } from './role.repository';
import { UsersModule } from '@app/users';
import { PrismaModule } from '@app/prisma/prisma.module';

@Module({
  controllers: [],
  providers: [RoleService, RoleRepository],
  exports: [RoleService],
  imports: [PermissionModule, UsersModule, PrismaModule],
})
export class RoleModule {}
