import {Body, Controller, Get, Param, Patch, Query, UseGuards} from '@nestjs/common';
import { JobsService } from './jobs.service.js';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { UserRole } from '../../common/enums/index.js';
import { AdminQueryJobsDto } from './dto/admin-query-jobs.dto.js';
import { RejectJobDto } from './dto/reject-job.dto.js';

@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('admin/jobs')
export class AdminJobsController {

    constructor(private readonly _jobsService: JobsService) {}

    @Get()
    findAll(@Query() query: AdminQueryJobsDto){
        return this._jobsService.adminFindAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this._jobsService.adminFindOne(id);
    }

    @Patch(':id/approve')
    approve(@Param('id') id: string){
        return this._jobsService.approveJob(id);
    }

    @Patch(':id/reject')
    reject(@Param('id') id: string, @Body() dto: RejectJobDto){
        return this._jobsService.reject(id, dto);
    }   

}