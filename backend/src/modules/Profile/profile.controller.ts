import {
  Patch,
  Req,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Get,
  Body,
  Controller,
  UseGuards,
  BadRequestException,
  Post,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'node:path';
import { randomUUID } from 'node:crypto';
import { ProfileService } from './profile.service.js';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';


@UseGuards(AuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(
    private readonly _profileService: ProfileService,
  ) {}

  // Get My Profile
  @Get('me')
  getMyProfile(@Req() req: any) {
    return this._profileService.getMyProfile(req.user);
  }

  // Update My Profile
  @Patch('me')
  updateMyProfile(
    @Req() req: any,
    @Body() dto: UpdateProfileDto,
  ) {
    return this._profileService.updateMyProfile(
      req.user._id.toString(),
      dto,
    );
  }
    // Upload Profile Photo
  @Post('me/photo')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads/profiles',
        filename: (_req, file, cb) =>
          cb(null, `${randomUUID()}${extname(file.originalname).toLowerCase()}`),
      }),
      limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
      fileFilter: (_req, file, cb) => {
        if (!/^image\/(jpeg|png|webp)$/.test(file.mimetype))
          return cb(
            new BadRequestException('Only JPG, PNG or WEBP images are allowed'),
            false,
          );
        cb(null, true);
      },
    }),
  )
  uploadPhoto(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Photo file is required');
    return this._profileService.updateProfileImage(
      req.user._id.toString(),
      `/uploads/profiles/${file.filename}`,
    );
  }
}