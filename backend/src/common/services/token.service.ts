import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AccountRole } from '../enums/index.js';
import { Types } from 'mongoose';

@Injectable()
export class TokenService {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _jwtService: JwtService,
  ) {}
  async generateToken(accountId: Types.ObjectId, role: string) {
    const payload = { sub: accountId };
    let secret: string | undefined;
    let expiresIn: string | undefined;
    switch (role) {
      case AccountRole.USER:
        secret = this._configService.get<string>('JWT_USER_SECRET');
        expiresIn = this._configService.get<string>('JWT_USER_EXPIRES');
        break;
      case AccountRole.ADMIN:
        secret = this._configService.get<string>('JWT_ADMIN_SECRET');
        expiresIn = this._configService.get<string>('JWT_ADMIN_EXPIRES');
      case AccountRole.COMPANY:
        secret = this._configService.get<string>('JWT_COMPANY_SECRET');
        expiresIn = this._configService.get<string>('JWT_COMPANY_EXPIRES');
        break;
    }

    const options: any = { secret };
    if (expiresIn) options.expiresIn = expiresIn;
    return await this._jwtService.signAsync(payload, options);
  }
  async verifyToken(token: string, roleSchema: string) {
    try {
      switch (roleSchema) {
        case AccountRole.USER:
          const userSecret = this._configService.get<string>('JWT_USER_SECRET');
          return await this._jwtService.verifyAsync(token, {
            secret: userSecret,
          });
        case AccountRole.ADMIN:
          const adminSecret =
            this._configService.get<string>('JWT_ADMIN_SECRET');
          return await this._jwtService.verifyAsync(token, {
            secret: adminSecret,
          });
        case AccountRole.COMPANY:
          const companySecret =
            this._configService.get<string>('JWT_COMPANY_SECRET');
          return await this._jwtService.verifyAsync(token, {
            secret: companySecret,
          });
      }
    } catch (error) {
      throw new UnauthorizedException(
        'Invalid or expired token signature for schema context',
        roleSchema,
      );
    }
  }
}
