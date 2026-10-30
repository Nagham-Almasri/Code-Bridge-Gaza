import {
  Controller,
  Get,
  Req,
  UseGuards,
  Patch,
  Body,
} from '@nestjs/common';

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
}