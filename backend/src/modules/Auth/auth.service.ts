
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../../DB/models/user.model.js';
import { UserStatus } from '../../common/enums/index.js';
import { compare } from '../../common/security/hash.js';
import { createOtp } from '../../common/security/otp.js';
import { TokenService } from '../../common/services/token.service.js';

import { MailService } from '../mail/mail.service.js';

import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { VerifyEmailDto } from './dto/verify.email.dto.js';
import { ForgotPasswordDto } from './dto/forgot-password.dto.js';
import { ResetPasswordDto } from './dto/reset-password.dto.js';
import { ResendOtpDto } from './dto/resend.otp.dto.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<UserDocument>,
    private readonly _mailService: MailService,
    private readonly _tokenService: TokenService,
  ) {}

  // Register
  async register(registerDto: RegisterDto) {
    const existingUser = await this._userModel.findOne({
      email: registerDto.email.toLowerCase(),
    });

    if (existingUser) {
      throw new ConflictException(
        'An account with this email address already exists',
      );
    }

    const { otp, hashedOtp, expiresAt } = await createOtp();

    const newUser = new this._userModel({
      ...registerDto,
      confirmEmailOtp: hashedOtp,
      emailOtpExpiresAt: expiresAt,
    });

    const savedUser = await newUser.save();

    await this._mailService.sendVerficationOtp(
      savedUser.email,
      otp,
      savedUser.fullName,
    );

    return {
      message:
        'Account created. Please check your email for the verification code.',
      user: {
        id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
      },
    };
  }

  // Login
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
    };
  }

  // Verify Email
  async verifyEmail(
    verifyEmailDto: VerifyEmailDto,
  ): Promise<{ message: string }> {
    const user = await this._userModel.findOne({
      email: verifyEmailDto.email.toLowerCase(),
    });

    if (!user) {
      throw new NotFoundException(
        'No Account record match this email address',
      );
    }

    if (user.confirmEmailAt) {
      throw new BadRequestException(
        'This email account has already been confirmed',
      );
    }

    if (
      !user.confirmEmailOtp ||
      !(await compare(verifyEmailDto.otp, user.confirmEmailOtp))
    ) {
      throw new BadRequestException(
        'The verification code provided is incorrect',
      );
    }

    if (
      !user.emailOtpExpiresAt ||
      new Date() > user.emailOtpExpiresAt
    ) {
      throw new BadRequestException(
        'This verification code has expired. Please request a new one.',
      );
    }

    user.confirmEmailAt = new Date();
    user.confirmEmailOtp = undefined;
    user.emailOtpExpiresAt = undefined;

    await user.save();

    return {
      message: 'Your email address has been successfully verified',
    };
  }

  // Forgot Password
  async forgotPassword(
    dto: ForgotPasswordDto,
  ): Promise<{ message: string }> {
    const genericResponse = {
      message: 'If this email is registered, a reset code has been sent',
    };

    const user = await this._userModel.findOne({
      email: dto.email.toLowerCase(),
    });

    if (!user || !user.confirmEmailAt) {
      return genericResponse;
    }

    const { otp, hashedOtp, expiresAt } = await createOtp();

    user.resetPasswordOtp = hashedOtp;
    user.resetPasswordOtpExpiresAt = expiresAt;

    await user.save();

    await this._mailService.sendResetPasswordOtp(
      user.email,
      otp,
      user.fullName,
    );

    return genericResponse;
  }

  // Reset Password
  async resetPassword(
    dto: ResetPasswordDto,
  ): Promise<{ message: string }> {
    const user = await this._userModel.findOne({
      email: dto.email.toLowerCase(),
    });

    if (
      !user ||
      !user.resetPasswordOtp ||
      !user.resetPasswordOtpExpiresAt ||
      !(await compare(dto.otp, user.resetPasswordOtp)) ||
      new Date() > user.resetPasswordOtpExpiresAt
    ) {
      throw new BadRequestException('Invalid or expired code');
    }

    user.password = dto.newPassword;
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpiresAt = undefined;

    await user.save();

    return {
      message: 'Your password has been reset successfully',
    };
  }

  // Resend OTP
  async resendOtp(resendOtp: ResendOtpDto) {
    const user = await this._userModel.findOne({
      email: resendOtp.email.toLowerCase(),
    });

    if (!user) {
      throw new NotFoundException(
        'No Account record match this email address',
      );
    }

    if (user.confirmEmailAt) {
      throw new BadRequestException(
        'This email account has already been confirmed',
      );
    }

    const { otp, hashedOtp, expiresAt } = await createOtp();

    user.confirmEmailOtp = hashedOtp;
    user.emailOtpExpiresAt = expiresAt;

    await user.save();

    await this._mailService.sendVerficationOtp(
      user.email,
      otp,
      user.fullName,
    );

    return {
      message:
        'A fresh verification code has been successfully dispatched to your inbox',
    };
  }
}
