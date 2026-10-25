import {Prop , Schema , SchemaFactory} from "@nestjs/mongoose";
import { HydratedDocument} from "mongoose";
import { UserRole, UserStatus , ExperienceLevel} from '../../common/enums/index.js';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true})
export class User{
    @Prop({required: true , trim: true})
    fullName: string;
    @Prop({required: true , unique: true , lowercase: true , trim: true})
    email: string;
    @Prop({required: true})
    password: string;
    @Prop({trim: true})
    major: string;
    @Prop()
    bio: string;
    @Prop()
    profileImage: string;
    @Prop({type: String , enum: UserRole , default: UserRole.USER})
    role: UserRole;
    @Prop({ type: String, enum: ExperienceLevel })
    experienceLevel: ExperienceLevel;
    @Prop({type: String , enum: UserStatus , default: UserStatus.ACTIVE})
    status :UserStatus;
    @Prop({ type: [String], default: [] })
    skills: string[];
    @Prop()
    refreshTokenHash?: string;
    @Prop({ default: false })
    confirmEmailOtp: string;
    @Prop()
    confirmEmailAt?: Date;
    @Prop()
    emailOtpExpiresAt?: Date;

}
export const UserSchema = SchemaFactory.createForClass(User);
