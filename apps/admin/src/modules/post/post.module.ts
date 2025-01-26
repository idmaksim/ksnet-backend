import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PrismaModule } from '@app/prisma/prisma.module';
import { UsersModule } from '@app/users';
import { PermissionModule } from '@app/permissions';
import { PostModule as LibPostModule } from '@app/post';

@Module({
  imports: [PrismaModule, UsersModule, PermissionModule, LibPostModule],
  providers: [PostService, PostRepository],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}
