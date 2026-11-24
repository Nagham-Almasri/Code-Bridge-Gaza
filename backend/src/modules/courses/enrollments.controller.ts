import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { AccountRole } from '../../common/enums/index.js';
import { EnrollmentsService } from './enrollments.service.js';
import { QueryEnrollmentsDto } from './dto/query-enrollments.dto.js';
import { UpdateProgressDto } from './dto/update-progress.dto.js';

@UseGuards(AuthGuard, RolesGuard)
@Roles(AccountRole.USER)
@Controller('courses')
export class EnrollmentsController {
  constructor(private readonly _enrollmentsService: EnrollmentsService) {}

  @Get('me/enrollments')
  findMine(@Req() req: any, @Query() query: QueryEnrollmentsDto) {
    return this._enrollmentsService.findMine(req.account._id, query);
  }

  @Get('me/enrollments/:courseId')
  findMineForCourse(@Req() req: any, @Param('courseId') courseId: string) {
    return this._enrollmentsService.findMineForCourse(req.account._id, courseId);
  }

  @Post(':id/enroll')
  enroll(@Req() req: any, @Param('id') id: string) {
    return this._enrollmentsService.enroll(req.account._id, id);
  }

  @Delete(':id/enroll')
  drop(@Req() req: any, @Param('id') id: string) {
    return this._enrollmentsService.drop(req.account._id, id);
  }

  @Patch(':id/progress')
  updateProgress(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateProgressDto) {
    return this._enrollmentsService.updateProgress(req.account._id, id, dto);
  }
}
