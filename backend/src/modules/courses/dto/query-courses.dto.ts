import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { CourseStatus} from "../../../common/enums/index.js"

export class QueryCoursesDto  {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsEnum(CourseStatus)
    statue?: string

    @IsOptional()
    @IsString()
    technology?: string;

    @IsOptional()
    @Type(()=>Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    limit?: number =10;
    
}

