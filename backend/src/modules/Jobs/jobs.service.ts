import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Job, JobDocument } from '../../DB/models/job.model.js';
import {JobApprovalStatus, JobStatus} from '../../common/enums/index.js';
import { QueryJobsDto } from './dto/query-jobs.dto.js';
import { AdminQueryJobsDto } from './dto/admin-query-jobs.dto.js';
import { RejectJobDto } from './dto/reject-job.dto.js';

@Injectable()

export class JobsService {
    constructor(
    @InjectModel(Job.name) private readonly _jobModel: Model<JobDocument>,    ){}

    async findAll(query: QueryJobsDto){
        const { search, employmentType, experienceLevel, location } = query;
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;

        const filter: Record<string, any> = {
            approvalStatus: JobApprovalStatus.APPROVED,
            status: JobStatus.ACTIVE,
        };
        if(employmentType) filter.employmentType = employmentType;
        if(experienceLevel) filter.experienceLevel = experienceLevel;
        if(location) filter.location = { $regex: new RegExp(location, 'i') };
        if(search) filter.$text = { $search: search };

        const [jobs, total] = await Promise.all([
            this._jobModel
            .find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .select('-rejectionReason -approvalStatus'),
            this._jobModel.countDocuments(filter),
        ]);

        return{
            success: true,
            results: jobs,
            pagination: {page, limit, total, pages: Math.ceil(total / limit)},
        };
    }
        async findOne(id: string){
            if(!isValidObjectId(id)) throw new NotFoundException('Job not found');
            const job = await this._jobModel.findOne({
                _id: id,
                approvalStatus: JobApprovalStatus.APPROVED,
                status: JobStatus.ACTIVE,
            })
            .select('-rejectionReason -approvalStatus');
            if(!job) throw new NotFoundException('Job not found');
            return { success: true, results:job };
        }
        async adminFindAll(query: AdminQueryJobsDto){
            const page = query.page ?? 1;
            const limit = query.limit ?? 10;
            const filter= {
                approvalStatus: query.approvalStatus ?? JobApprovalStatus.PENDING,
            };
            const [jobs, total] = await Promise.all([
                this._jobModel
                .find(filter)
                .sort({ createdAt: -1})
                .skip((page - 1) * limit)
                .limit(limit),
                this._jobModel.countDocuments(filter),
            ]);

            return {
                success: true,
                results: jobs,
                pagination: { page, limit, total, pages: Math.ceil(total / limit)},
            };
            }
        async adminFindOne(id: string){
            if(!isValidObjectId(id)) throw new NotFoundException('Job not found');
            const job = await this._jobModel.findById(id);
            if(!job) throw new NotFoundException('job not found');
            return { success: true, results: job};

        }    

        async approveJob(id: string){
            const job = await this._getPendingJob(id);
            job.approvalStatus = JobApprovalStatus.APPROVED;
            job.rejectionReason = undefined;
            await job.save();
            return { success: true, message: 'Job approved', results: job};
        }

        async reject(id: string , dto: RejectJobDto){
            const job = await this._getPendingJob(id);
            job.approvalStatus = JobApprovalStatus.REJECTED;
            job.rejectionReason = dto.rejectionReason;
            await job.save();
            return { success: true, message: 'Job rejected', results: job};
        }

        private async _getPendingJob(id: string){
            if(!isValidObjectId(id)) throw new NotFoundException('Job not found');
            const job = await this._jobModel.findById(id);
            if(!job) throw new NotFoundException('Job not found');
            if(job.approvalStatus !== JobApprovalStatus.PENDING) 
                throw new BadRequestException('This job has already been reviewed');
            return job;
        }
}   
    