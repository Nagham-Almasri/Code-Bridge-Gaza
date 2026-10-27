import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../DB/models/user.model.js';
import { RegisterDto } from './dto/register.dto.js';
import { hash } from '../../common/security/hash.js';
import { MailService } from '../mail/mail.service.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly _userModel: Model<UserDocument>,
    private readonly _mailService: MailService,
  ) {}
  async register(registerDto: RegisterDto) {
    const existingUser = await this._userModel.findOne({
      email: registerDto.email,
    });
    if (existingUser)
      throw new ConflictException(
        'An account with this email address already exists',
      );
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await hash(otp);
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 5);
    const newUser = new this._userModel({
      ...registerDto,
      confirmEmailOtp: hashedOtp,
      emailOtpExpiresAt: expiryTime,
    });
    const savedUser = await newUser.save();
    await this._mailService.sendVerficationOtp(
      savedUser.email,
      otp,
      savedUser.fullName,
    );
    return savedUser;
  }
}
