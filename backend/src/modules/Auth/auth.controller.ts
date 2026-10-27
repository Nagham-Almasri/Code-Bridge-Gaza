import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto.js';
import { AuthService } from './auth.service.js';

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
}
