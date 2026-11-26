import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, isValidObjectId } from 'mongoose';
import { Course, CourseDocument } from '../../DB/models/course.model.js';
import { Enrollment, EnrollmentDocument } from '../../DB/models/enrollment.model.js';
import { CourseStatus, EnrollmentStatus } from '../../common/enums/index.js';
import { QueryEnrollmentsDto } from './dto/query-enrollments.dto.js';
import { UpdateProgressDto } from './dto/update-progress.dto.js';

const COURSE_FIELDS = 'title category level technology courseLink imageUrl status';

const statusForProgress = (progress: number) =>
  progress >= 100
    ? EnrollmentStatus.COMPLETED
    : progress > 0
      ? EnrollmentStatus.IN_PROGRESS
      : EnrollmentStatus.ENROLLED;

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectModel(Course.name) private readonly _courseModel: Model<CourseDocument>,
    @InjectModel(Enrollment.name) private readonly _enrollmentModel: Model<EnrollmentDocument>,
  ) {}

  async enroll(userId: Types.ObjectId, courseId: string) {
    if (!isValidObjectId(courseId)) throw new NotFoundException('Course not found');
    const course = await this._courseModel.exists({ _id: courseId, status: CourseStatus.ACTIVE });
    if (!course) throw new NotFoundException('Course not found');

    const existing = await this._enrollmentModel.findOne({ user: userId, course: courseId });
    if (existing) {
      if (existing.status !== EnrollmentStatus.DROPPED)
        throw new ConflictException('You are already enrolled in this course');
      // Re-enrolling after dropping keeps the saved progress.
      existing.status = statusForProgress(existing.progress);
      await existing.save();
      return { success: true, message: 'Re-enrolled in course', results: existing };
    }

    try {
      const enrollment = await this._enrollmentModel.create({ user: userId, course: courseId });
      return { success: true, message: 'Enrolled in course', results: enrollment };
    } catch (error: any) {
      if (error?.code === 11000)
        throw new ConflictException('You are already enrolled in this course');
      throw error;
    }
  }

  async drop(userId: Types.ObjectId, courseId: string) {
    const enrollment = await this._getEnrollment(userId, courseId);
    if (enrollment.status === EnrollmentStatus.DROPPED)
      throw new BadRequestException('You already dropped this course');
    enrollment.status = EnrollmentStatus.DROPPED;
    await enrollment.save();
    return { success: true, message: 'Course dropped, your progress is saved', results: enrollment };
  }

  async updateProgress(userId: Types.ObjectId, courseId: string, dto: UpdateProgressDto) {
    const enrollment = await this._getEnrollment(userId, courseId);
    if (enrollment.status === EnrollmentStatus.DROPPED)
      throw new BadRequestException('Re-enroll in this course to update progress');

    enrollment.progress = dto.progress;
    enrollment.status = statusForProgress(dto.progress);
    if (enrollment.status === EnrollmentStatus.COMPLETED) {
      enrollment.completedAt ??= new Date();
    } else {
      enrollment.completedAt = undefined;
    }
    await enrollment.save();
    return { success: true, message: 'Progress updated', results: enrollment };
  }

  async findMine(userId: Types.ObjectId, query: QueryEnrollmentsDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const filter: Record<string, any> = { user: userId };
    if (query.status) filter.status = query.status;

    const [enrollments, total] = await Promise.all([
      this._enrollmentModel
        .find(filter)
        .sort({ enrolledAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('course', COURSE_FIELDS),
      this._enrollmentModel.countDocuments(filter),
    ]);
    return {
      success: true,
      results: enrollments,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  async findMineForCourse(userId: Types.ObjectId, courseId: string) {
    const enrollment = await this._getEnrollment(userId, courseId);
    await enrollment.populate('course', COURSE_FIELDS);
    return { success: true, results: enrollment };
  }

  private async _getEnrollment(userId: Types.ObjectId, courseId: string) {
    if (!isValidObjectId(courseId)) throw new NotFoundException('Enrollment not found');
    const enrollment = await this._enrollmentModel.findOne({ user: userId, course: courseId });
    if (!enrollment) throw new NotFoundException('You are not enrolled in this course');
    return enrollment;
  }
}
