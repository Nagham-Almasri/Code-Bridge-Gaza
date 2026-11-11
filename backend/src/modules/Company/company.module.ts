import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller.js';
import { CompanyService } from './company.service.js';
import { CompanyModel } from '../../DB/models/company.model.js';
import { MailService } from '../mail/mail.service.js';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../Auth/auth.module.js';
import { UserModel } from '../../DB/models/user.model.js';
import { CloudinaryService } from '../../common/services/cloudinary.service.js';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, MailService, CloudinaryService],
  imports: [CompanyModel, AuthModule, JwtModule.register({}), UserModel],
})
export class CompanyModule {}
