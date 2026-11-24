import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller.js';
import { AdminCoursesController } from './admin-courses.controller.js';
import { CoursesService } from './courses.service.js';
import { EnrollmentsController } from './enrollments.controller.js';
import { EnrollmentsService } from './enrollments.service.js';
import { CourseModel } from '../../DB/models/course.model.js';
import { EnrollmentModel } from '../../DB/models/enrollment.model.js';
import { UserModel } from '../../DB/models/user.model.js';
import { CompanyModel } from '../../DB/models/company.model.js';
import { AuthModule } from '../Auth/auth.module.js';
import { CloudinaryService } from '../../common/services/cloudinary.service.js';

@Module({
  imports: [CourseModel, EnrollmentModel, UserModel, CompanyModel, AuthModule],
  controllers: [EnrollmentsController, CoursesController, AdminCoursesController],
  providers: [CoursesService, EnrollmentsService, CloudinaryService],
  exports: [CoursesService],
})
export class CoursesModule {}