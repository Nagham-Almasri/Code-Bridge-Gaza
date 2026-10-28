import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service.js';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../DB/models/user.model.js';
import { Model } from 'mongoose';
import { UserRole } from '../enums/index.js';

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
    const payload = await this._tokenService.verifyToken(token, roleSchema);
    const userDoc = await this._userModel
      .findById(payload.sub)
      .select('-password');
    if (!userDoc)
      throw new UnauthorizedException(
        'User account no longer exists in the system',
      );
    request['user'] = userDoc;

    return true;
  }
}
