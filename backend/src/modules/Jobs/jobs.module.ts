import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller.js';
import { JobsService } from './jobs.service.js';
import { JwtModule } from '@nestjs/jwt';
import { JobModel } from '../../DB/models/job.model.js';
import { UserModel } from '../../DB/models/user.model.js';
import { TokenService} from '../../common/services/token.service.js';
import { AdminJobsController } from './admin-jobs.controller.js';
@Module({
  imports:[JobModel, UserModel, JwtModule.register({})],
  controllers: [JobsController, AdminJobsController],
  providers: [JobsService, TokenService],
  exports: [JobsService],
})
export class JobsModule {}
