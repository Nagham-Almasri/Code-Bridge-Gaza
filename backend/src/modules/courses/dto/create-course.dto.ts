import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { CourseLevel } from '../../../common/enums/index.js';

export class CourseLinkDto {
  @IsUrl()
  url: string;
}

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

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CourseLinkDto)
  courseLinks: CourseLinkDto[];

  @IsString() @IsNotEmpty() @MaxLength(2000)
  description: string;

  @IsNumber()
  @Min(0)
  durationHours: number;

  @IsString() @IsNotEmpty() @MaxLength(100)
  provider: string;
}
