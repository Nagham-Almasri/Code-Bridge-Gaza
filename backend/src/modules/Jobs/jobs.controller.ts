import { Controller, Get, Param, Query, UseGuards} from '@nestjs/common';
import { JobsService } from './jobs.service.js';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { QueryJobsDto } from './dto/query-jobs.dto.js';

@UseGuards(AuthGuard)
@Controller('jobs')
export class JobsController {

constructor(private readonly _jobsService: JobsService) {}
    @Get()
    findAll(@Query() query: QueryJobsDto){
    return this._jobsService.findAll(query);    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this._jobsService.findOne(id);
    }
    
}
