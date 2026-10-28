import { IsEmail , IsString , Length , MinLength } from "class-validator";
import { Match } from "../../../common/decorators/match-password.decorator.js";

export class ResetPasswordDto {
    @IsEmail()
    email: string;

    @IsString()
    @Length(6,6)
    otp: string;

    @IsString()
    @MinLength(8)
    newPassword: string;

    @IsString()
    @Match('newPasswoed' , { message: 'Passwords do not match'})
    confirmPassword: string;
}