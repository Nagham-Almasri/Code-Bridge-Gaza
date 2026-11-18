import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AccountRole } from '../../../common/enums/index.js';

export class LoginDto {
  @IsEmail({}, { message: 'please provide a valid email format' })
  @IsNotEmpty()
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
  @IsEnum(AccountRole, {
    message: 'Invalid role. Must be either "USER" or "ADMIN","COMPANY"',
  })
  role: string;
}
