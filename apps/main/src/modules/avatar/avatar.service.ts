import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectS3, S3 } from 'nestjs-s3';
import { AvatarRepository } from './avatar.repository';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AvatarService implements OnModuleInit {
  private bucketName: string;

  constructor(
    @InjectS3() private readonly s3: S3,
    private readonly configService: ConfigService,
    private readonly avatarRepository: AvatarRepository,
    private readonly i18n: I18nService,
  ) {}

  async onModuleInit() {
    this.bucketName = this.configService.get('S3_BUCKET_NAME');
  }

  async updateAvatar(userId: string, file: Express.Multer.File) {
    const filename = `avatars/${userId}-avatar.png`;
    file.filename = filename;

    await this.deleteAvatarIfExists(userId);

    await this.s3.putObject({
      Bucket: this.bucketName,
      Key: filename,
      Body: file.buffer,
    });

    return this.avatarRepository.create(userId, filename);
  }

  async deleteAvatarIfExists(userId: string) {
    const avatar = await this.avatarRepository.deleteIfExists(userId);
    if (avatar) {
      try {
        await this.s3.deleteObject({
          Bucket: this.bucketName,
          Key: avatar.url,
        });
      } catch (error) {
        throw new InternalServerErrorException(
          this.i18n.t('errors.internalServerError'),
        );
      }
    }
  }
}
