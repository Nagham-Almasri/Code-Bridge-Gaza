import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto.js';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { VerifyEmailDto } from './dto/verify.email.dto.js';
import { ForgotPasswordDto } from './dto/forgot-password.dto.js';
import { ResetPasswordDto } from './dto/reset-password.dto.js';
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this._authService.register(registerDto);
    return {
      success: true,
      message: 'Done',
      results: user,
    };
  }
  @Post('login')
  @HttpCode(200)
  login(@Body() dto: LoginDto) {
    return this._authService.login(dto);
  }
  @Post('verify-email')
  async verfiyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return await this._authService.verifyEmail(verifyEmailDto);
  }
  @Post('forget-password')
  @HttpCode(200)
  forgotPassword(@Body() dto: ForgotPasswordDto){
    return this._authService.forgotPassword(dto);
  }

  @Post('reset-password')
  @HttpCode(200)
  resetPassword(@Body() dto: ResetPasswordDto){
    return this._authService.resetPassword(dto);
  }
}
