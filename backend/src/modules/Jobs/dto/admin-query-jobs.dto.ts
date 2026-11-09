import { Type} from "class-transformer";
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { JobApprovalStatus } from "../../../common/enums/index.js";

export class AdminQueryJobsDto {
    @IsOptional()
    @IsEnum(JobApprovalStatus)
    approvalStatus?: JobApprovalStatus = JobApprovalStatus.PENDING;

    @IsOptional()
    @Type(()=> Number)
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