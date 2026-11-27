import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { User, UserDocument } from '../../DB/models/user.model.js';
import { Company, HCompanyDocument } from '../../DB/models/company.model.js';
import { Job, JobDocument } from '../../DB/models/job.model.js';
import { Application, ApplicationDocument } from '../../DB/models/application.model.js';
import { Course, CourseDocument } from '../../DB/models/course.model.js';
import { Enrollment, EnrollmentDocument } from '../../DB/models/enrollment.model.js';
import { CV, CVDocument } from '../../DB/models/cv.model.js';
import {
  AccountRole,
  AccountStatus,
  ApplicationStatus,
  CourseStatus,
  EnrollmentStatus,
  JobApprovalStatus,
  JobStatus,
} from '../../common/enums/index.js';
import { DashboardQueryDto } from './dto/dashboard-query.dto.js';

// Turns [{ _id: 'active', count: 3 }] into { active: 3 }, with every expected key present.
const toCounts = <T extends string>(rows: { _id: T; count: number }[], keys: T[]) => {
  const counts = Object.fromEntries(keys.map((k) => [k, 0])) as Record<T, number>;
  for (const row of rows) if (row._id in counts) counts[row._id] = row.count;
  return counts;
};

const sum = (counts: Record<string, number>) =>
  Object.values(counts).reduce((total, n) => total + n, 0);

const monthKey = (date: Date) =>
  `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;

const RECENT_LIMIT = 5;

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(User.name) private readonly _userModel: Model<UserDocument>,
    @InjectModel(Company.name) private readonly _companyModel: Model<HCompanyDocument>,
    @InjectModel(Job.name) private readonly _jobModel: Model<JobDocument>,
    @InjectModel(Application.name) private readonly _applicationModel: Model<ApplicationDocument>,
    @InjectModel(Course.name) private readonly _courseModel: Model<CourseDocument>,
    @InjectModel(Enrollment.name) private readonly _enrollmentModel: Model<EnrollmentDocument>,
    @InjectModel(CV.name) private readonly _cvModel: Model<CVDocument>,
  ) {}

  async getOverview(query: DashboardQueryDto) {
    const months = query.months ?? 6;
    const since = new Date();
    since.setUTCDate(1);
    since.setUTCHours(0, 0, 0, 0);
    since.setUTCMonth(since.getUTCMonth() - (months - 1));

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const userFilter = { role: AccountRole.USER };
    const companyFilter = { deletedAt: null };

    const [
      userStatus,
      newUsers,
      companyStatus,
      newCompanies,
      jobApproval,
      jobStatus,
      applicationStatus,
      courseStatus,
      enrollmentStatus,
      cvTotal,
      cvWithPdf,
      userTrend,
      jobTrend,
      applicationTrend,
      recentUsers,
      pendingJobs,
    ] = await Promise.all([
      this._groupCount(this._userModel, 'status', userFilter),
      this._userModel.countDocuments({ ...userFilter, createdAt: { $gte: thirtyDaysAgo } }),
      this._groupCount(this._companyModel, 'status', companyFilter),
      this._companyModel.countDocuments({ ...companyFilter, createdAt: { $gte: thirtyDaysAgo } }),
      this._groupCount(this._jobModel, 'approvalStatus'),
      this._groupCount(this._jobModel, 'status', { approvalStatus: JobApprovalStatus.APPROVED }),
      this._groupCount(this._applicationModel, 'status'),
      this._groupCount(this._courseModel, 'status'),
      this._groupCount(this._enrollmentModel, 'status'),
      this._cvModel.countDocuments(),
      this._cvModel.countDocuments({ pdfUrl: { $nin: [null, ''] } }),
      this._monthlyCount(this._userModel, since, userFilter),
      this._monthlyCount(this._jobModel, since),
      this._monthlyCount(this._applicationModel, since),
      this._userModel
        .find(userFilter)
        .sort({ createdAt: -1 })
        .limit(RECENT_LIMIT)
        .select('fullName email major status createdAt')
        .lean(),
      this._jobModel
        .find({ approvalStatus: JobApprovalStatus.PENDING })
        .sort({ createdAt: -1 })
        .limit(RECENT_LIMIT)
        .select('title companyName location employmentType createdAt')
        .lean(),
    ]);

    const users = toCounts(userStatus, Object.values(AccountStatus));
    const companies = toCounts(companyStatus, Object.values(AccountStatus));
    const approval = toCounts(jobApproval, Object.values(JobApprovalStatus));
    const live = toCounts(jobStatus, Object.values(JobStatus));
    const applications = toCounts(applicationStatus, Object.values(ApplicationStatus));
    const courses = toCounts(courseStatus, Object.values(CourseStatus));
    const enrollments = toCounts(enrollmentStatus, Object.values(EnrollmentStatus));

    const enrollmentTotal = sum(enrollments);
    const applicationTotal = sum(applications);

    return {
      success: true,
      results: {
        users: { total: sum(users), ...users, newLast30Days: newUsers },
        companies: { total: sum(companies), ...companies, newLast30Days: newCompanies },
        jobs: {
          total: sum(approval),
          pendingApproval: approval.pending,
          approved: approval.approved,
          rejected: approval.rejected,
          // Approved jobs split by whether they still accept applications.
          open: live.active,
          closed: live.closed,
        },
        applications: {
          total: applicationTotal,
          ...applications,
          acceptanceRate: percent(applications.accepted, applicationTotal),
        },
        courses: { total: sum(courses), ...courses },
        enrollments: {
          total: enrollmentTotal,
          enrolled: enrollments.enrolled,
          inProgress: enrollments['in-progress'],
          completed: enrollments.completed,
          dropped: enrollments.dropped,
          completionRate: percent(enrollments.completed, enrollmentTotal),
        },
        cvs: { total: cvTotal, withPdf: cvWithPdf },
        trends: buildTrends(since, months, {
          users: userTrend,
          jobs: jobTrend,
          applications: applicationTrend,
        }),
        recent: { users: recentUsers, pendingJobs },
      },
    };
  }

  private _groupCount(model: Model<any>, field: string, match: Record<string, unknown> = {}) {
    return model.aggregate<{ _id: any; count: number }>([
      { $match: match },
      { $group: { _id: `$${field}`, count: { $sum: 1 } } },
    ]);
  }

  private _monthlyCount(model: Model<any>, since: Date, match: Record<string, unknown> = {}) {
    const pipeline: PipelineStage[] = [
      { $match: { ...match, createdAt: { $gte: since } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt', timezone: 'UTC' } },
          count: { $sum: 1 },
        },
      },
    ];
    return model.aggregate<{ _id: string; count: number }>(pipeline);
  }
}

function percent(part: number, total: number) {
  return total === 0 ? 0 : Math.round((part / total) * 1000) / 10;
}

// One entry per month (oldest first), filling months with no activity with 0.
function buildTrends(
  since: Date,
  months: number,
  series: Record<'users' | 'jobs' | 'applications', { _id: string; count: number }[]>,
) {
  const lookup = Object.fromEntries(
    Object.entries(series).map(([name, rows]) => [
      name,
      new Map(rows.map((r) => [r._id, r.count])),
    ]),
  ) as Record<keyof typeof series, Map<string, number>>;

  return Array.from({ length: months }, (_, i) => {
    const date = new Date(since);
    date.setUTCMonth(since.getUTCMonth() + i);
    const month = monthKey(date);
    return {
      month,
      users: lookup.users.get(month) ?? 0,
      jobs: lookup.jobs.get(month) ?? 0,
      applications: lookup.applications.get(month) ?? 0,
    };
  });
}
