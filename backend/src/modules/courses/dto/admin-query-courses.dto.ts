import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { CourseStatus } from '../../../common/enums/index.js';

export class AdminQueryCoursesDto {
  @IsOptional() @IsEnum(CourseStatus)
  status?: CourseStatus;

  @IsOptional() @Type(() => Number) @IsInt() @Min(1)
  page?: number = 1;

  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(50)
  limit?: number = 10;
}