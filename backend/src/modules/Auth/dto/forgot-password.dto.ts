import { IsEmail, IsEnum } from 'class-validator';
import { AccountRole } from '../../../common/enums/index.js';

export class ForgotPasswordDto {
  @IsEmail()
  email: string;
  @IsEnum(AccountRole, {
    message: 'Invalid role. Must be either "USER" or "ADMIN","COMPANY"',
  })
  role: string;
}
