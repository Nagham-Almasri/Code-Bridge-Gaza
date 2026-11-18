import {
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';

export const imageValidationPipe = () =>
  new ParseFilePipe({
    validators: [
      new FileTypeValidator({
        fileType: /^image\/(jpeg|png|webp)$/,
      }),

      new MaxFileSizeValidator({
        maxSize: 2 * 1024 * 1024,
      }),
    ],
  });
