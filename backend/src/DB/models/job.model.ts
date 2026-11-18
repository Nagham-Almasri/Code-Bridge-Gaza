import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  JobLocation,
  JobStatus,
  WorkingTime,
} from '../../common/enums/job.enum.js';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Job {
  @Prop({ required: true, trim: true })
  jobTitle: string;
  @Prop({ required: true, enum: JobLocation })
  jobLocation: string;
  @Prop({ required: true, enum: WorkingTime })
  workingTime: string;
  @Prop({ required: true, trim: true })
  jobDescription: string;

  @Prop({ required: true })
  salary: number;
  @Prop({ type: [String], required: true, trim: true })
  technicalSkills: string[];
  @Prop({ required: true, ref: 'Company' })
  companyId: Types.ObjectId;
  @Prop({ type: String, enum: JobStatus, default: JobStatus.PENDING })
  status: JobStatus;
}

const jobSchema = SchemaFactory.createForClass(Job);

export type HJobDocument = HydratedDocument<Job>;
export const JobModel = MongooseModule.forFeature([
  { name: Job.name, schema: jobSchema },
]);
