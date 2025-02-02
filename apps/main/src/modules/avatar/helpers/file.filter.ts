import { BadRequestException } from '@nestjs/common';

export const fileFilter = async (req, file: Express.Multer.File, callback) => {
  const i18n = req.i18nService;
  const allowedMimeTypes = ['image/jpeg', 'image/png'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    const errorMessage = await i18n.translate('errors.invalidFileType', {
      lang: req.i18nLang,
    });
    return callback(new BadRequestException(errorMessage), false);
  }
  callback(null, true);
};
