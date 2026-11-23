import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service.js';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { QueryCoursesDto } from './dto/query-courses.dto.js';


@UseGuards(AuthGuard)
@Controller('courses')
export class CoursesController {
    constructor(private readonly _coursesService: CoursesService){}

    @Get()
    findAll(@Query() query: QueryCoursesDto){
        return this._coursesService.findAll(query);
    }

    @Get('categories')
    findCategories() {
        return this._coursesService.findCategories();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this._coursesService.findOne(id);
    }
}
