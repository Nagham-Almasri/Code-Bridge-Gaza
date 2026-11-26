import {
  Body, Controller, Delete, Get, Param, Patch, Post, Query,
  UploadedFile, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CoursesService } from './courses.service.js';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { AccountRole } from '../../common/enums/index.js';
import { imageValidationPipe } from '../../common/pipes/image-validation.pipe.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
import { UpdateCourseStatusDto } from './dto/update-course-status.dto.js';
import { AdminQueryCoursesDto } from './dto/admin-query-courses.dto.js';

@UseGuards(AuthGuard, RolesGuard)
@Roles(AccountRole.ADMIN)
@Controller('admin/courses')
export class AdminCoursesController {
  constructor(private readonly _coursesService: CoursesService) {}

  @Get()
  findAll(@Query() q: AdminQueryCoursesDto) { return this._coursesService.adminFindAll(q); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this._coursesService.adminFindOne(id); }

  @Post()
  create(@Body() dto: CreateCourseDto) { return this._coursesService.create(dto); }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this._coursesService.update(id, dto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateCourseStatusDto) {
    return this._coursesService.updateStatus(id, dto);
  }

  @Patch(':id/image')
  @UseInterceptors(FileInterceptor('image'))
  updateImage(
    @Param('id') id: string,
    @UploadedFile(imageValidationPipe()) file: Express.Multer.File,
  ) {
    return this._coursesService.updateImage(id, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) { return this._coursesService.remove(id); }
}