import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, IsUrl, MaxLength } from 'class-validator';
import { CourseLevel } from '../../../common/enums/index.js';

export class CreateCourseDto {
  @IsString() @IsNotEmpty() @MaxLength(150)
  title: string;

  @Transform(({ value }) => value?.trim().toLowerCase())
  @IsString() @IsNotEmpty() @MaxLength(60)
  category: string;

  @IsEnum(CourseLevel)
  level: CourseLevel;

  @IsString() @IsNotEmpty() @MaxLength(60)
  technology: string;

  @IsUrl()
  courseLink: string;

  @IsString() @IsNotEmpty() @MaxLength(2000)
  description: string;
}