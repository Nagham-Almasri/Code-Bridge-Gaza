import { Module } from '@nestjs/common';
import { CvService } from './cv.service.js';
import { CvController } from './cv.controller.js';
import { CloudinaryService } from '../../common/services/cloudinary.service.js';
import { CVModel } from '../../DB/models/cv.model.js';
import { UserModel } from '../../DB/models/user.model.js';
import { AuthModule } from '../Auth/auth.module.js';
import { JwtModule } from '@nestjs/jwt';
import { CompanyModel } from '../../DB/models/company.model.js';

@Module({
  imports: [
    UserModel,
    CVModel,
    AuthModule,
    JwtModule.register({}),
    CompanyModel,
  ],
  controllers: [CvController],
  providers: [CvService, CloudinaryService],
})
export class CvModule {}
