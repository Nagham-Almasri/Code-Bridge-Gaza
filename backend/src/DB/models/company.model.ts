import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { AccountRole, AccountStatus } from '../../common/enums/index.js';
import { hash } from '../../common/security/hash.js';
export type HCompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true })
export class Company {
  @Prop({
    type: String,
    required: true,
    unique: true,
    minLength: 2,
    maxlength: 25,
  })
  companyName: string;
  @Prop({
    type: String,
    required: true,
    minLength: 2,
    maxlength: 300,
  })
  description: string;
  @Prop({
    type: String,
  })
  address: string;
  @Prop({
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email: string;
  @Prop({ required: true })
  password: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  approvedByAdmin: boolean;
  @Prop({
    type: Date,
  })
  deletedAt: Date;
  @Prop({
    type: Date,
  })
  bannedAt: Date;
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
  @Prop({ type: String, enum: AccountStatus, default: AccountStatus.ACTIVE })
  status: AccountStatus;
  @Prop({ type: String, enum: AccountRole, default: AccountRole.COMPANY })
  role: AccountRole;
  @Prop({ type: { url: String, publicId: String }, _id: false })
  logo?: { url: string; publicId: string };
}

const companySchema = SchemaFactory.createForClass(Company);
companySchema.index({ companyName: 1, email: 1 }, { unique: true });
companySchema.pre('findOneAndDelete', async function (next) {});
companySchema.pre('save', async function (this: HCompanyDocument) {
  if (!this.isModified('password') || !this.password) return;
  this.password = await hash(this.password);
});
export const CompanyModel = MongooseModule.forFeature([
  { name: Company.name, schema: companySchema },
]);
