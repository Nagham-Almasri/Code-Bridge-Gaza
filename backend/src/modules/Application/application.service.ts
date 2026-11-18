import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Job } from '../../DB/models/job.model.js';
import {
  Application,
  ApplicationDocument,
} from '../../DB/models/application.model.js';
import { JobApprovalStatus, JobStatus } from '../../common/enums/index.js';
import { CV } from '../../DB/models/cv.model.js';
import { UpdateApplicationStatusDto } from './dto/updateApplication.dto.js';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Job.name)
    private readonly _jobModel: Model<Job>,
    @InjectModel(CV.name)
    private readonly _cvModel: Model<CV>,
    @InjectModel(Application.name)
    private readonly _applicationModel: Model<ApplicationDocument>,
  ) {}

  async applyJob(userId: Types.ObjectId, jobId: Types.ObjectId) {
    const job = await this._jobModel.findById(jobId);

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (
      job.status !== JobStatus.ACTIVE ||
      job.approvalStatus !== JobApprovalStatus.APPROVED ||
      (job.applicationDeadline && job.applicationDeadline < new Date())
    ) {
      throw new BadRequestException('Job is not available for application');
    }

    const cv = await this._cvModel.findOne({
      user: userId,
    });

    if (!cv?.pdfUrl) {
      throw new BadRequestException('Generate your CV first');
    }

    try {
      const application = await this._applicationModel.create({
        job: job._id,
        applicant: userId,
        company: job.company,
        cvUrl: cv.pdfUrl,
      });

      return {
        message: 'Application submitted successfully',
        id: application._id,
      };
    } catch (error) {
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === 11000
      ) {
        throw new ConflictException('You already applied to this job');
      }

      throw error;
    }
  }
  async getMyApplications(userId: Types.ObjectId) {
    const applications = await this._applicationModel
      .find({ applicant: userId })
      .populate('job', 'title location employmentType')
      .populate('company', 'companyName logo address')
      .sort({ createdAt: -1 });

    return {
      message: 'Applications retrieved successfully',
      applications,
    };
  }
  async updateApplicationStatus(
    companyId: Types.ObjectId,
    applicationId: Types.ObjectId,
    dto: UpdateApplicationStatusDto,
  ) {
    const application = await this._applicationModel.findOneAndUpdate(
      {
        _id: applicationId,
        company: companyId,
      },
      {
        $set: { status: dto.status },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!application) {
      throw new NotFoundException(
        'Application not found or you are not authorized to update it',
      );
    }
    return {
      message: 'Application status updated successfully',
      application,
    };
  }
  async getJobApplications(companyId: Types.ObjectId, jobId: Types.ObjectId) {
    const job = await this._jobModel.findOne({
      _id: jobId,
      company: companyId,
    });

    if (!job) {
      throw new NotFoundException(
        'Job not found or you are not authorized to access it',
      );
    }

    const applications = await this._applicationModel
      .find({
        job: job._id,
        company: companyId,
      })
      .populate(
        'applicant',
        'fullName email profileImage major experienceLevel',
      )
      .sort({ createdAt: -1 });

    return {
      message: 'Job applications retrieved successfully',
      applications,
    };
  }
}
