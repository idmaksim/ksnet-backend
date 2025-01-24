import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PrismaModule } from '@app/prisma/prisma.module';
import { UsersModule } from '@app/users';
import { PermissionModule } from '@app/permissions';
import { PostModule as LibPostModule } from '@app/post';
import { TagModule } from '@app/tag';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    PermissionModule,
    LibPostModule,
    TagModule,
  ],
  providers: [PostService, PostRepository],
  controllers: [PostController],
})
export class PostModule {}
