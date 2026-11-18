import { IsEmail, IsEnum, IsString, Length, MinLength } from 'class-validator';
import { Match } from '../../../common/decorators/match-password.decorator.js';
import { AccountRole } from '../../../common/enums/index.js';

export class ResetPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 6)
  otp: string;

  @IsString()
  @MinLength(8)
  newPassword: string;

  @IsString()
  @Match('newPassword', { message: 'Passwords do not match' })
  confirmPassword: string;
  @IsEnum(AccountRole, {
    message: 'Invalid role. Must be either "USER" or "ADMIN","COMPANY"',
  })
  role: string;
}
