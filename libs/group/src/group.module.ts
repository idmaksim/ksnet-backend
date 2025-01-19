import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupRepository } from './group.repository';
import { PrismaModule } from '@app/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [GroupService, GroupRepository],
  exports: [GroupService],
})
export class GroupModule {}
