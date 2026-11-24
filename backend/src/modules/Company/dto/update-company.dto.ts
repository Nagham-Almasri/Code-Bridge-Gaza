import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateCompanyDto {
  @IsString()
  @MinLength(2)
  @IsOptional()
  @MaxLength(25)
  companyName?: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(300)
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  address?: string;
}
