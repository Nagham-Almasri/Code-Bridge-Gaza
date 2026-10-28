import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { TokenService } from '../services/token.service.js';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../DB/models/user.model.js';
import { Model } from 'mongoose';
import { UserRole, UserStatus } from '../enums/index.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _tokenService: TokenService,
    @InjectModel(User.name) private readonly _userModel: Model<UserDocument>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader)
      throw new UnauthorizedException('Authorization header is missing');
    const [roleSchema, token] = authHeader.split(' ');
    if (
      !token ||
      (roleSchema.toUpperCase() !== UserRole.USER &&
        roleSchema.toUpperCase() !== UserRole.ADMIN)
    )
      throw new UnauthorizedException('Invalid Authorization');

    let payload: { sub: string };
    try {
      payload = await this._tokenService.verifyToken(token, roleSchema);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const userDoc = await this._userModel
      .findById(payload.sub)
      .select('-password');
    if (!userDoc)
      throw new UnauthorizedException(
        'User account no longer exists in the system',
      );
    if (userDoc.status === UserStatus.PAUSED)
      throw new ForbiddenException('Your account is paused');
    request['user'] = userDoc;

    return true;
  }
}
