import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller.js';
import { ProfileService } from './profile.service.js';
import { UserModel } from '../../DB/models/user.model.js';
import { AuthModule } from '../Auth/auth.module.js';
import { CompanyModel } from '../../DB/models/company.model.js';
import { CloudinaryService } from '../../common/services/cloudinary.service.js';

@Module({
  imports: [UserModel, AuthModule, CompanyModel],
  controllers: [ProfileController],
  providers: [ProfileService, CloudinaryService],
})
export class ProfileModule {}