import { ConflictException, Injectable } from '@nestjs/common';
import { User, UserDocument } from '../../DB/models/user.model.js';
import { RegisterDto } from './dto/register.dto.js';
import { hash } from '../../common/security/hash.js';
import { MailService } from '../mail/mail.service.js';
import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserStatus } from '../../common/enums/index.js';
import { compare } from '../../common/security/hash.js';
import { TokenService } from '../../common/services/token.service.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly _userModel: Model<UserDocument>,
    private readonly _mailService: MailService,
    private readonly _tokenService: TokenService,
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
  async login(dto: LoginDto) {
    const user = await this._userModel.findOne({
      email: dto.email.toLowerCase(),
    });

    if (!user || !(await compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.confirmEmailAt) {
      throw new ForbiddenException('Please confirm your email first');
    }

    if (user.status === UserStatus.PAUSED) {
      throw new ForbiddenException('Your account is paused');
    }

    const accessToken = await this._tokenService.generateToken(
      user._id,
      user.role,
    );

    return {
      message: 'Login successful',
      accessToken,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    };
  }
}
