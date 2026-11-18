import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller.js';
import { AdminJobsController } from './admin-jobs.controller.js';
import { JobsService } from './jobs.service.js';
import { JobModel } from '../../DB/models/job.model.js';
import { UserModel } from '../../DB/models/user.model.js';
import { CompanyModel } from '../../DB/models/company.model.js';
import { AuthModule } from '../Auth/auth.module.js';

@Module({
  imports: [JobModel, UserModel, CompanyModel, AuthModule],
  controllers: [JobsController, AdminJobsController],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule {}