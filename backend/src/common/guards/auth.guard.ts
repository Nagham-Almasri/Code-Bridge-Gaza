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
import { AccountRole, AccountStatus } from '../enums/index.js';
import { AuthService } from '../../modules/Auth/auth.service.js';
import { Model } from 'mongoose';
import { Company, HCompanyDocument } from '../../DB/models/company.model.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _tokenService: TokenService,
    private readonly _authService: AuthService,
    @InjectModel(User.name)
    private readonly _userModel: Model<UserDocument>,
    @InjectModel(Company.name)
    private readonly _companyModel: Model<HCompanyDocument>,
  ) {}
  async findAccountById(id: string, role?: AccountRole) {
    if (role === AccountRole.COMPANY) return this._companyModel.findById(id);
    if (role) return this._userModel.findById(id);
    return (
      (await this._userModel.findById(id)) ??
      (await this._companyModel.findById(id))
    );
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader)
      throw new UnauthorizedException('Authorization header is missing');
    const [roleSchemaRaw, token] = authHeader.split(' ');
    const roleSchema = roleSchemaRaw?.toUpperCase();
    if (
      !token ||
      (roleSchema !== AccountRole.USER &&
        roleSchema !== AccountRole.ADMIN &&
        roleSchema !== AccountRole.COMPANY)
    )
      throw new UnauthorizedException('Invalid Authorization');
    let payload: { sub: string };
    try {
      payload = await this._tokenService.verifyToken(token, roleSchema);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
    const accountName = roleSchema === AccountRole.COMPANY ? 'company' : 'user';
    const account = await this.findAccountById(payload.sub);
    if (!account)
      throw new UnauthorizedException(
        `The ${accountName} account no longer exists in the system`,
      );
    if (account.status === AccountStatus.PAUSED)
      throw new ForbiddenException(`Your ${accountName} account is paused`);

    request['account'] = account;

    return true;
  }
}
