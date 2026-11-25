import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../DB/models/user.model.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { CloudinaryService } from '../../common/services/cloudinary.service.js';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<UserDocument>,
    private readonly _cloudinaryService: CloudinaryService,
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
        phone: user.phone,
        location: user.location,
      },
    };
  }

  // Update My Profile
  async updateMyProfile(userId: string, dto: UpdateProfileDto) {
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

  // Upload Profile Photo
  async updateProfileImage(userId: string, file: Express.Multer.File) {
    const user = await this._userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const uploaded = await this._cloudinaryService.uploadImage(
      file,
      'PROFILE',
      userId,
    );

    const oldPublicId = user.profileImagePublicId;
    user.profileImage = uploaded.url;
    user.profileImagePublicId = uploaded.publicId;
    await user.save();

    if (oldPublicId)
      await this._cloudinaryService.deleteImage(oldPublicId).catch(() => null);

    return {
      success: true,
      message: 'Profile photo updated successfully',
      results: { profileImage: user.profileImage },
    };
  }
}
