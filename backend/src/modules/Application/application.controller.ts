import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { ApplicationService } from './application.service.js';
import { Types } from 'mongoose';
import { AccountRole } from '../../common/enums/index.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { UpdateApplicationStatusDto } from './dto/updateApplication.dto.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
@UseGuards(AuthGuard)
@Controller('application')
export class ApplicationController {
  constructor(private readonly _applicationService: ApplicationService) {}
  @Patch('/:jobId/apply')
  async applyJob(@Req() req: any, @Param('jobId') jobId: Types.ObjectId) {
    const userId = req.account.id;
    return await this._applicationService.applyJob(userId, jobId);
  }
  @Get('/my-applications')
  async getMyApplications(@Req() req: any) {
    const userId = req.account.id;
    return await this._applicationService.getMyApplications(userId);
  }
  @Patch('/:applicationId/status')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(AccountRole.COMPANY)
  updateApplicationStatus(
    @Param('applicationId') applicationId: Types.ObjectId,
    @Req() req: any,
    @Body() dto: UpdateApplicationStatusDto,
  ) {
    const companyId = req.account!.id;
    return this._applicationService.updateApplicationStatus(
      companyId,
      applicationId,
      dto,
    );
  }
  @Get('company/me/jobs/:jobId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(AccountRole.COMPANY)
  getJobApplications(@Param('jobId') jobId: Types.ObjectId, @Req() req: any) {
    if (!Types.ObjectId.isValid(jobId)) {
      throw new BadRequestException('Invalid job ID');
    }
    return this._applicationService.getJobApplications(req.account._id, jobId);
  }
}
