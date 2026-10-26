import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../enums/index.js';
import { Types } from 'mongoose';

@Injectable()
export class TokenService {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _jwtService: JwtService,
  ) {}
  async generateToken(userId: Types.ObjectId, role: string) {
    const payload = { sub: userId };
    const secret = this._configService.get<string>(
      role === UserRole.ADMIN ? 'JWT_ADMIN_SECRET' : 'JWT_USER_SECRET',
    );
    const expiresIn = this._configService.get<string>(
      role === UserRole.ADMIN ? 'JWT_ADMIN_EXPIRES' : 'JWT_USER_EXPIRES',
    );
    const options: any = { secret };
    if (expiresIn) options.expiresIn = expiresIn;
    return await this._jwtService.signAsync(payload, options);
  }
  async verifyToken(token: string, roleSchema: string) {
    try {
      const secret = this._configService.get<string>(
        roleSchema === UserRole.ADMIN ? 'JWT_ADMIN_SECRET' : 'JWT_USER_SECRET',
      );

      return await this._jwtService.verifyAsync(token, { secret });
    } catch (error) {
      throw new UnauthorizedException(
        'Invalid or expired token signature for schema context',
        roleSchema,
      );
    }
  }
}
