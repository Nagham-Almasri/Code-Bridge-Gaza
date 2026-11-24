import {IsNotEmpty, IsString, MaxLength} from "class-validator";

export class RejectJobDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(500)
    rejectionReason: string;
}