import { Module } from '@nestjs/common';

import { ProfileController } from './profile.controller.js';
import { ProfileService } from './profile.service.js';
import { UserModel } from '../../DB/models/user.model.js';
import { AuthModule } from '../Auth/auth.module.js';

@Module({
  imports: [UserModel, AuthModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}