import { IsEnum } from 'class-validator';
import { CourseStatus } from '../../../common/enums/index.js';

export class UpdateCourseStatusDto {
  @IsEnum(CourseStatus)
  status: CourseStatus;
}