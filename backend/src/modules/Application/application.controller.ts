import { Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { ApplicationService } from './application.service.js';
import { Types } from 'mongoose';

@Controller('application')
export class ApplicationController {
  constructor(private readonly _applicationService: ApplicationService) {}
  @Patch('/:jobId/apply')
  @UseGuards(AuthGuard)
  async applyJob(@Req() req: any, @Param('jobId') jobId: Types.ObjectId) {
    const userId = req.user.id;
    return await this._applicationService.applyJob(userId, jobId);
  }
  @Get('/my-applications')
  @UseGuards(AuthGuard)
  async getMyApplications(@Req() req: any) {
    const userId = req.user.id;
    return await this._applicationService.getMyApplications(userId);
  }
}
