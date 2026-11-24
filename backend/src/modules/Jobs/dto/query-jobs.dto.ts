import {Type} from 'class-transformer';
import {IsEnum, IsInt, IsOptional, IsString, Max, Min} from 'class-validator';
import { EmploymentType, JobExperienceLevel } from '../../../common/enums/index.js';

export class QueryJobsDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsEnum(EmploymentType)
    employmentType?: EmploymentType;

    @IsOptional()
    @IsEnum(JobExperienceLevel)
    experienceLevel?: JobExperienceLevel;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    limit?: number = 10;
}