import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
class LanguageDto {
  @IsString()
  @MaxLength(50)
  language: string;

  @IsString()
  @MaxLength(50)
  proficiency: string;
}
class EducationDto {
  @IsString()
  @MaxLength(150)
  university: string;

  @IsString()
  @MaxLength(150)
  degree: string;

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  gpa?: string;
}

class ExperienceDto {
  @IsString()
  @MaxLength(150)
  jobTitle: string;

  @IsString()
  @MaxLength(150)
  company: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  duration?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  location?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;
}

export class CreateCVDto {
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  professionalSummary?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  education: EducationDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  experience: ExperienceDto[];
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LanguageDto)
  languages: LanguageDto[];
}
