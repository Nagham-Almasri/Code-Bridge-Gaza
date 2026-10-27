import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../DB/models/user.model.js';
import { UserStatus } from '../../common/enums/index.js';
import { compare } from '../../common/security/hash.js';
import { TokenService } from '../../common/services/token.service.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly tokenService: TokenService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({
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

    const accessToken = await this.tokenService.generateToken(
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