import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { PasswordModule } from '@app/password';
import { PrismaModule } from '@app/prisma/prisma.module';
import { GroupModule } from '@app/group';

@Module({
  imports: [PasswordModule, PrismaModule, GroupModule],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
