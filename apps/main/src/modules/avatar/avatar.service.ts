import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectS3, S3 } from 'nestjs-s3';

@Injectable()
export class AvatarService implements OnModuleInit {
  private bucketName: string;

  constructor(
    @InjectS3() private readonly s3: S3,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    this.bucketName = this.configService.get('S3_BUCKET_NAME');
  }

  async updateAvatar(userId: string, file: Express.Multer.File) {
    file.filename = `${userId}-avatar.png`;

    await this.s3.putObject({
      Bucket: this.bucketName,
      Key: file.filename,
      Body: file.buffer,
    });
  }
}
