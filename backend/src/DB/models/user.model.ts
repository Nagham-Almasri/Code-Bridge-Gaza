import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  AccountStatus,
  ExperienceLevel,
  AccountRole,
} from '../../common/enums/index.js';
import { hash } from '../../common/security/hash.js';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true })
  fullName: string;
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ trim: true })
  major: string;
  @Prop()
  bio: string;
  @Prop()
  profileImage: string;
  @Prop({ type: String, enum: AccountRole, default: AccountRole.USER })
  role: AccountRole;
  @Prop({ type: String, enum: ExperienceLevel })
  experienceLevel: ExperienceLevel;
  @Prop({ type: String, enum: AccountStatus, default: AccountStatus.ACTIVE })
  status: AccountStatus;
  @Prop({ type: [String], default: [] })
  skills: string[];
  @Prop()
  refreshTokenHash?: string;
  @Prop({ type: String, default: undefined })
  confirmEmailOtp?: string | undefined;
  @Prop()
  confirmEmailAt?: Date;
  @Prop()
  emailOtpExpiresAt?: Date;
  @Prop({ type: String, default: undefined })
  resetPasswordOtp?: string | undefined;
  @Prop()
  resetPasswordOtpExpiresAt?: Date;
  @Prop({ trim: true })
  jobTitle?: string;
  @Prop({ type: [String], default: [] })
  careerInterests?: string[];
}
export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', async function (this: UserDocument) {
  if (!this.isModified('password') || !this.password) return;
  this.password = await hash(this.password);
});
export const UserModel = MongooseModule.forFeature([
  { name: User.name, schema: UserSchema },
]);
