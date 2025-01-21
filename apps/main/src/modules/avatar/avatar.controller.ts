import {
  ActiveGuard,
  DecodeUser,
  JwtAuthGuard,
  PermissionGuard,
  User,
} from '@app/common';
import {
  BadRequestException,
  Controller,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AvatarService } from './avatar.service';

@Controller('avatar')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, ActiveGuard, PermissionGuard)
export class AvatarController {
  constructor(private readonly service: AvatarService) {}

  @Put()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: async (req, file, callback) => {
        const i18n = req.i18nService;
        const allowedMimeTypes = ['image/jpeg', 'image/png'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
          const errorMessage = await i18n.translate('errors.invalidFileType', {
            lang: req.i18nLang,
          });
          return callback(new BadRequestException(errorMessage), false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @DecodeUser() user: User,
  ) {
    return this.service.updateAvatar(user.id, file);
  }
}
