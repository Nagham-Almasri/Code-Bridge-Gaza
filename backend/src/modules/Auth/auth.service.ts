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
import { AccountStatus } from '../../common/enums/index.js';
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
import { Company, HCompanyDocument } from '../../DB/models/company.model.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<UserDocument>,
    @InjectModel(Company.name)
    private readonly _companyModel: Model<HCompanyDocument>,

    private readonly _mailService: MailService,
    private readonly _tokenService: TokenService,
  ) {}
  async findAccountByEmail(email: string) {
    const user = await this._userModel.findOne({ email });
    if (user) return user;
    return this._companyModel.findOne({ email });
  }

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
    console.log('Register OTP:', otp);

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
    const account = await this.findAccountByEmail(dto.email.toLowerCase());
    if (!account || !(await compare(dto.password, account.password)))
      throw new UnauthorizedException('Invalid credentials');
    if (!account.confirmEmailAt)
      throw new ForbiddenException('Please confirm your email first');
    if (account.status === AccountStatus.PAUSED) {
      throw new ForbiddenException('Your account is paused');
    }

    const accessToken = await this._tokenService.generateToken(
      account._id,
      account.role,
    );

    return {
      message: 'Login successful',
      accessToken,
      role: account.role,
    };
  }

  // Verify Email
  async verifyEmail(
    verifyEmailDto: VerifyEmailDto,
  ): Promise<{ message: string }> {
    const account = await this.findAccountByEmail(
      verifyEmailDto.email.toLowerCase(),
    );

    if (!account) {
      throw new NotFoundException('No Account record match this email address');
    }

    if (account.confirmEmailAt) {
      throw new BadRequestException(
        'This email account has already been confirmed',
      );
    }

    if (
      !account.confirmEmailOtp ||
      !(await compare(verifyEmailDto.otp, account.confirmEmailOtp))
    ) {
      throw new BadRequestException(
        'The verification code provided is incorrect',
      );
    }

    if (!account.emailOtpExpiresAt || new Date() > account.emailOtpExpiresAt) {
      throw new BadRequestException(
        'This verification code has expired. Please request a new one.',
      );
    }

    account.confirmEmailAt = new Date();
    account.confirmEmailOtp = undefined;
    account.emailOtpExpiresAt = undefined;

    await account.save();

    return {
      message: 'Your email address has been successfully verified',
    };
  }

  // Forgot Password
  async forgotPassword(dto: ForgotPasswordDto): Promise<{ message: string }> {
    const genericResponse = {
      message: 'If this email is registered, a reset code has been sent',
    };

    const account = await this.findAccountByEmail(dto.email.toLowerCase());

    if (!account || !account.confirmEmailAt) {
      return genericResponse;
    }

    const { otp, hashedOtp, expiresAt } = await createOtp();
        console.log('Forget Password OTP:', otp);


    account.resetPasswordOtp = hashedOtp;
    account.resetPasswordOtpExpiresAt = expiresAt;

    await account.save();
    const accountName =
      'companyName' in account ? account.companyName : account.fullName;
    await this._mailService.sendResetPasswordOtp(
      account.email,
      otp,
      accountName,
    );

    return genericResponse;
  }

  // Reset Password
  async resetPassword(dto: ResetPasswordDto): Promise<{ message: string }> {
    const account = await this.findAccountByEmail(dto.email.toLowerCase());

    if (
      !account ||
      !account.resetPasswordOtp ||
      !account.resetPasswordOtpExpiresAt ||
      !(await compare(dto.otp, account.resetPasswordOtp)) ||
      new Date() > account.resetPasswordOtpExpiresAt
    ) {
      throw new BadRequestException('Invalid or expired code');
    }

    account.password = dto.newPassword;
    account.resetPasswordOtp = undefined;
    account.resetPasswordOtpExpiresAt = undefined;

    await account.save();

    return {
      message: 'Your password has been reset successfully',
    };
  }

  // Resend OTP
  async resendOtp(resendOtp: ResendOtpDto) {
    const account = await this.findAccountByEmail(
      resendOtp.email.toLowerCase(),
    );

    if (!account) {
      throw new NotFoundException('No Account record match this email address');
    }

    if (account.confirmEmailAt) {
      throw new BadRequestException(
        'This email account has already been confirmed',
      );
    }

    const { otp, hashedOtp, expiresAt } = await createOtp();
        console.log('Resend OTP:', otp);


    account.confirmEmailOtp = hashedOtp;
    account.emailOtpExpiresAt = expiresAt;

    await account.save();
    const accountName =
      'companyName' in account ? account.companyName : account.fullName;
    await this._mailService.sendVerficationOtp(account.email, otp, accountName);

    return {
      message:
        'A fresh verification code has been successfully dispatched to your inbox',
    };
  }
}

