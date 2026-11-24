import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from "mongoose";
import { Course, CourseDocument  } from '../../DB/models/course.model.js';
import { CourseStatus } from '../../common/enums/index.js';
import { QueryCoursesDto } from './dto/query-courses.dto.js';
import { Enrollment , EnrollmentDocument} from '../../DB/models/enrollment.model.js';
import { CloudinaryService } from '../../common/services/cloudinary.service.js';
import { AdminQueryCoursesDto } from './dto/admin-query-courses.dto.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
import { UpdateCourseStatusDto } from './dto/update-course-status.dto.js';



const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

@Injectable()
export class CoursesService {
constructor(
  @InjectModel(Course.name) private readonly _courseModel: Model<CourseDocument>,
  @InjectModel(Enrollment.name) private readonly _enrollmentModel: Model<EnrollmentDocument>,
  private readonly _cloudinaryService: CloudinaryService,
) {}    async findAll (query: QueryCoursesDto){
        const page = query.page ?? 1;
        const limit = query.limit ?? 10 ;

        const filter: Record<string, any> = { status:CourseStatus.ACTIVE};
        if( query.category) filter.category = query.category.trim().toLowerCase();
        if (query.level) filter.level = query.level;
        if(query.technology) filter.technology={        $regex: `^${escapeRegex(query.technology.trim())}$`,
        $options: 'i',};
        if(query.search) filter.$text = { $search: query.search};

        const [course , total] = await Promise.all([
            this._courseModel
            .find(filter)
            .sort({ createdAt: -1})
            .skip((page-1) * limit)
            .limit(limit)
            .select('-imagePublicId'),
            this._courseModel.countDocuments(filter),
        ]);
        return{
            success: true,
            results: course,
            pagination: { page, limit, total, pages: Math.ceil(total/limit)},
        };
    }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new NotFoundException('Course not found');
    const course = await this._courseModel
      .findOne({ _id: id, status: CourseStatus.ACTIVE })
      .select('-imagePublicId');
    if (!course) throw new NotFoundException('Course not found');
    return { success: true, results: course };
  }

  async findCategories() {
    const categories = await this._courseModel.distinct('category', {
      status: CourseStatus.ACTIVE,
    });
    return { success: true, results: categories.sort() };
  }

    async adminFindAll(query: AdminQueryCoursesDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const filter: Record<string, any> = {};
    if (query.status) filter.status = query.status;
    const [courses, total] = await Promise.all([
      this._courseModel.find(filter).sort({ createdAt: -1 })
        .skip((page - 1) * limit).limit(limit),
      this._courseModel.countDocuments(filter),
    ]);
    return {
      success: true,
      results: courses,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  async adminFindOne(id: string) {
    return { success: true, results: await this._getCourse(id) };
  }

  async create(dto: CreateCourseDto) {
    const course = await this._courseModel.create(dto);
    return { success: true, message: 'Course created', results: course };
  }

  async update(id: string, dto: UpdateCourseDto) {
    const course = await this._getCourse(id);
    Object.assign(course, dto);
    await course.save();
    return { success: true, message: 'Course updated', results: course };
  }

  async updateStatus(id: string, dto: UpdateCourseStatusDto) {
    const course = await this._getCourse(id);
    course.status = dto.status;
    await course.save();
    return { success: true, message: `Course is now ${dto.status}`, results: course };
  }

  async updateImage(id: string, file: Express.Multer.File) {
    const course = await this._getCourse(id);
    const uploaded = await this._cloudinaryService.uploadImage(file, 'COURSE', id);
    const oldId = course.imagePublicId;
    course.imageUrl = uploaded.url;
    course.imagePublicId = uploaded.publicId;
    await course.save();
    if (oldId) await this._cloudinaryService.deleteImage(oldId).catch(() => null);
    return { success: true, message: 'Course image updated', results: course };
  }

  async remove(id: string) {
    const course = await this._getCourse(id);
    const enrolled = await this._enrollmentModel.countDocuments({ course: course._id });
    if (enrolled > 0)
      throw new BadRequestException('Course has enrollments, archive it instead');
    if (course.imagePublicId)
      await this._cloudinaryService.deleteImage(course.imagePublicId).catch(() => null);
    await course.deleteOne();
    return { success: true, message: 'Course deleted' };
  }

  private async _getCourse(id: string) {
    if (!isValidObjectId(id)) throw new NotFoundException('Course not found');
    const course = await this._courseModel.findById(id);
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }
  
}
