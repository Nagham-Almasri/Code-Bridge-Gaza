import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  User,
  UserDocument,
} from '../../DB/models/user.model.js';

import { UpdateProfileDto } from './dto/update-profile.dto.js';

@Injectable()
export class ProfileService {

  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<UserDocument>,
  ) {}

  // Get My Profile
  getMyProfile(user: UserDocument) {
    return {
      success: true,
      message: 'Profile fetched successfully',
      results: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        major: user.major,
        bio: user.bio,
        profileImage: user.profileImage,
        experienceLevel: user.experienceLevel,
        skills: user.skills,
      },
    };
  }

  // Update My Profile
  async updateMyProfile(
    userId: string,
    dto: UpdateProfileDto,
  ) {
    const updatedUser = await this._userModel.findByIdAndUpdate(
      userId,
      { $set: dto },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return this.getMyProfile(updatedUser);
  }
}