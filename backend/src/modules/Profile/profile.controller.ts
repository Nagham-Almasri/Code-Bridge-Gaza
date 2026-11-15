import {
  Patch,
  Req,
  UploadedFile,
  UseInterceptors,
  Get,
  Body,
  Controller,
  UseGuards,
  Post,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileService } from './profile.service.js';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { imageValidationPipe } from '../../common/pipes/image-validation.pipe.js';

@UseGuards(AuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly _profileService: ProfileService) {}

  // Get My Profile
  @Get('me')
  getMyProfile(@Req() req: any) {
    return this._profileService.getMyProfile(req.account);
  }

  // Update My Profile
  @Patch('me')
  updateMyProfile(@Req() req: any, @Body() dto: UpdateProfileDto) {
    return this._profileService.updateMyProfile(
      req.account._id.toString(),
      dto,
    );
  }

  // Upload Profile Photo
  @Post('me/photo')
  @UseInterceptors(FileInterceptor('photo'))
  uploadPhoto(
    @Req() req: any,
    @UploadedFile(imageValidationPipe()) file: Express.Multer.File,
  ) {
    return this._profileService.updateProfileImage(
      req.account._id.toString(),
      file,
    );
  }
}