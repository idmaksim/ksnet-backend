import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import config from '../../config/config';
import { AuthModule } from '../auth/auth.module';
import { LoggerMiddleware } from '@app/common/middlewares/logger.middleware';
import { PermissionModule } from 'libs/permissions/src';
import { PermissionGuard } from '@app/common/guards/permission.guard';
import { TokenModule } from '@app/token';
import { UsersModule } from '../users/users.module';
import { AvatarModule } from '../avatar/avatar.module';
import { GroupModule } from '../group/group.module';
import { TagModule } from '../tag/tag.module';
import { S3Module } from 'nestjs-s3';
import { PostModule } from '../post/post.module';
import { LikeModule } from '../like/like.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      fallbacks: {
        'ru-*': 'ru',
        'en-*': 'en',
      },
      loaderOptions: {
        path: `./libs/i18n/`,
        watch: true,
      },
      resolvers: [AcceptLanguageResolver],
    }),
    S3Module.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        config: {
          credentials: {
            accessKeyId: configService.get('S3_ACCESS_KEY_ID'),
            secretAccessKey: configService.get('S3_SECRET_ACCESS_KEY'),
          },
          endpoint: configService.get('S3_ENDPOINT'),
          region: configService.get('S3_REGION'),
          forcePathStyle: true,
          s3ForcePathStyle: true,
          signatureVersion: 'v4',
        },
      }),
    }),
    AuthModule,
    TokenModule,
    UsersModule,
    AvatarModule,
    GroupModule,
    TagModule,
    PostModule,
    LikeModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
