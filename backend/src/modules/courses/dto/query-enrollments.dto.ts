import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { EnrollmentStatus } from '../../../common/enums/index.js';

export class QueryEnrollmentsDto {
  @IsOptional() @IsEnum(EnrollmentStatus)
  status?: EnrollmentStatus;

  @IsOptional() @Type(() => Number) @IsInt() @Min(1)
  page?: number = 1;

  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(50)
  limit?: number = 10;
}
