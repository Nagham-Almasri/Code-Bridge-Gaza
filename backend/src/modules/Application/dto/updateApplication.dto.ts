import { IsEnum } from 'class-validator';
import { ApplicationStatus } from '../../../common/enums/index.js';

export class UpdateApplicationStatusDto {
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;
}
