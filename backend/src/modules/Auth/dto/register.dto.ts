import {
  ArrayNotEmpty,
  Equals,
  IsArray,
  IsEmail,
  IsEnum,
  IsString,
  MinLength,
  IsBoolean,
} from 'class-validator';
import { ExperienceLevel } from '../../../common/enums/index.js';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  confirmPassword: string;

  @IsString()
  major: string;

  @IsEnum(ExperienceLevel)
  experienceLevel: ExperienceLevel;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  skills: string[];

  @IsBoolean()
  @Equals(true, { message: 'You must accept the terms and conditions' })
  acceptTerms: boolean;
}
