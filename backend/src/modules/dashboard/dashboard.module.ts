import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller.js';
import { DashboardService } from './dashboard.service.js';
import { UserModel } from '../../DB/models/user.model.js';
import { CompanyModel } from '../../DB/models/company.model.js';
import { JobModel } from '../../DB/models/job.model.js';
import { ApplicationModel } from '../../DB/models/application.model.js';
import { CourseModel } from '../../DB/models/course.model.js';
import { EnrollmentModel } from '../../DB/models/enrollment.model.js';
import { CVModel } from '../../DB/models/cv.model.js';
import { AuthModule } from '../Auth/auth.module.js';

@Module({
  imports: [
    UserModel,
    CompanyModel,
    JobModel,
    ApplicationModel,
    CourseModel,
    EnrollmentModel,
    CVModel,
    AuthModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
