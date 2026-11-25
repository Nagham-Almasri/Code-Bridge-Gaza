import { IsEmail, IsEnum } from 'class-validator';
import { AccountRole } from '../../../common/enums/index.js';

export class ForgotPasswordDto {
  @IsEmail()
  email: string;
 
}
