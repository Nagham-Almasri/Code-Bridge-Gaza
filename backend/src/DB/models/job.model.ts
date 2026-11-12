import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { EmploymentType, JobApprovalStatus, JobExperienceLevel, JobStatus } from "../../common/enums/index.js";
export type JobDocument = HydratedDocument<Job>;

@Schema({ timestamps: true })

export class Job {
    @Prop({type: Types.ObjectId, ref: 'Company', required: true, index: true})
    company: Types.ObjectId;

    @Prop({required: true, trim: true})
    title: string;

    @Prop({required: true, trim: true})
    companyName: string;

    @Prop({required: true, trim: true, lowercase: true})
    companyEmail: string;

    @Prop({required: true, trim: true})
    location: string;

    @Prop({type: String, enum: EmploymentType, required: true})
    employmentType: EmploymentType;

    @Prop({type: String, enum: JobExperienceLevel})
    experienceLevel: JobExperienceLevel;

    @Prop({trim: true})
    salaryRange?: string;

    @Prop({required: true})
    description: string;

    @Prop({type: [String], default: []})
    requiredSkills: string[];

    @Prop()
    applicationDeadline?: Date;

    @Prop({default:1, min: 1})
    openings: number;

    @Prop({type: String, enum: JobStatus, default: JobStatus.ACTIVE})
    status: JobStatus;

    @Prop({
        type: String,
        enum: JobApprovalStatus,
        default: JobApprovalStatus.PENDING,
        index: true
    })
    approvalStatus: JobApprovalStatus;

    @Prop()
    rejectionReason?: string;
}


export const JobSchema = SchemaFactory.createForClass(Job);
JobSchema.index({ title: 'text', description: 'text', requiredSkills: 'text' });

export const JobModel = MongooseModule.forFeature([{ name: Job.name, schema: JobSchema },]);
