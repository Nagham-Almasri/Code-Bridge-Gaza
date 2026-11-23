import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { EnrollmentStatus } from '../../common/enums/index.js';

export type EnrollmentDocument = HydratedDocument<Enrollment>;

@Schema({ timestamps: true })
export class Enrollment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true, index: true })
  course: Types.ObjectId;

  @Prop({ type: Number, min: 0, max: 100, default: 0 })
  progress: number;

  @Prop({
    type: String,
    enum: EnrollmentStatus,
    default: EnrollmentStatus.ENROLLED,
  })
  status: EnrollmentStatus;

  @Prop({ type: Date, default: Date.now })
  enrolledAt: Date;

  @Prop({ type: Date })
  completedAt?: Date;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);
EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

export const EnrollmentModel = MongooseModule.forFeature([
  { name: Enrollment.name, schema: EnrollmentSchema },
]);