import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { AccountRole } from '../../common/enums/index.js';
import { DashboardService } from './dashboard.service.js';
import { DashboardQueryDto } from './dto/dashboard-query.dto.js';

@UseGuards(AuthGuard, RolesGuard)
@Roles(AccountRole.ADMIN)
@Controller('admin/dashboard')
export class DashboardController {
  constructor(private readonly _dashboardService: DashboardService) {}

  @Get()
  getOverview(@Query() query: DashboardQueryDto) {
    return this._dashboardService.getOverview(query);
  }
}
