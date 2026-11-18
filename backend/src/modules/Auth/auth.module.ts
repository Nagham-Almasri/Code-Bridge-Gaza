import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { UserModel } from '../../DB/models/user.model.js';
import { MailModule } from '../mail/mail.module.js';
import { TokenService } from '../../common/services/token.service.js';

@Module({
  imports: [UserModel, MailModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
  exports: [TokenService],
})
export class AuthModule {}
