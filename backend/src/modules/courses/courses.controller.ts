import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service.js';
import { RecommendationsService } from './recommendations.service.js';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { AccountRole } from '../../common/enums/index.js';
import { QueryCoursesDto } from './dto/query-courses.dto.js';
import { RecommendCoursesDto } from './dto/recommend-courses.dto.js';


@UseGuards(AuthGuard)
@Controller('courses')
export class CoursesController {
    constructor(
        private readonly _coursesService: CoursesService,
        private readonly _recommendationsService: RecommendationsService,
    ){}

    @Get()
    findAll(@Query() query: QueryCoursesDto){
        return this._coursesService.findAll(query);
    }

    @Get('categories')
    findCategories() {
        return this._coursesService.findCategories();
    }

    // Must stay above ':id' so "recommended" is not read as a course id.
    @Get('recommended')
    @UseGuards(RolesGuard)
    @Roles(AccountRole.USER)
    recommended(@Req() req: any, @Query() query: RecommendCoursesDto) {
        return this._recommendationsService.recommend(req.account, query);
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this._coursesService.findOne(id);
    }
}
