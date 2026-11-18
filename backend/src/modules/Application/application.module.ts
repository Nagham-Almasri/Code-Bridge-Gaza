import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller.js';
import { ApplicationService } from './application.service.js';
import { JobsModule } from '../Jobs/jobs.module.js';
import { ApplicationModel } from '../../DB/models/application.model.js';
import { CompanyModel } from '../../DB/models/company.model.js';
import { CVModel } from '../../DB/models/cv.model.js';
import { JobModel } from '../../DB/models/job.model.js';
import { UserModel } from '../../DB/models/user.model.js';
import { AuthModule } from '../Auth/auth.module.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JobModel,
    ApplicationModel,
    CompanyModel,
    CVModel,
    AuthModule,
    JwtModule.register({}),
    UserModel,
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
  exports: [ApplicationService],
})
export class ApplicationModule {}
