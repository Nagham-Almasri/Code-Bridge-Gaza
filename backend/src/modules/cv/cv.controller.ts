import {
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Body,
  Put,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseInterceptors,
} from '@nestjs/common';
import { CvService } from './cv.service.js';
import { CreateCVDto } from './dto/create-cv.dto.js';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('cv')
@UseGuards(AuthGuard)
export class CvController {
  constructor(private readonly _cvService: CvService) {}

  @Get('me')
  async getMyCV(@Req() req: any) {
    return this._cvService.getMyCv(req.account._id);
  }
  @Put('me')
  saveCV(@Req() req: any, @Body() createCVDto: CreateCVDto) {
    return this._cvService.saveCV(req.account._id, createCVDto);
  }

  @Post('me')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1,
      },
    }),
  )
  async generateCV(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'application/pdf' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Req() req: any,
  ) {
    return this._cvService.generateCV(req.account._id, file);
  }
}
