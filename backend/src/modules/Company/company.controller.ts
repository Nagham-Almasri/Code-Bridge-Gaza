import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AddCompanyDto } from './dto/add-company.dto.js';
import { CompanyService } from './company.service.js';
import { UpdateCompanyDto } from './dto/update-company.dto.js';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { AccountRole } from '../../common/enums/index.js';
import { DeleteAccountDto } from './dto/delete-company.dto.js';
import { SearchCompanyDto } from './dto/search-company.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { imageValidationPipe } from '../../common/pipes/image-validation.pipe.js';

@Controller('company')
export class CompanyController {
  constructor(private readonly _companyService: CompanyService) {}
  @Post('add-company')
  addCompany(@Body() addCompanyDto: AddCompanyDto) {
    return this._companyService.addCompany(addCompanyDto);
  }
  @Patch('update-company')
  @UseGuards(AuthGuard)
  @Roles(AccountRole.COMPANY)
  updateCompany(@Body() updateCompanyDto: UpdateCompanyDto, @Req() req: any) {
    const company_id = req.account._id;
    return this._companyService.updateCompany(company_id, updateCompanyDto);
  }
  @Get('get-company')
  @UseGuards(AuthGuard)
  getCompany(@Req() req: any) {
    const company_id = req.account._id;
    return this._companyService.getCompanyById(company_id);
  }
  @Get('search-companies')
  searchCompany(@Query() searchCompanyDto: SearchCompanyDto) {
    return this._companyService.searchCompany(searchCompanyDto);
  }
  @Patch('upload-logo')
  @UseGuards(AuthGuard)
  @Roles(AccountRole.COMPANY)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      limits: {
        fileSize: 2 * 1024 * 1024,
        files: 1,
      },
    }),
  )
  uploadLogo(
    @Req() req: any,
    @UploadedFile(imageValidationPipe()) file: Express.Multer.File,
  ) {
    const companyId = req.account._id;
    return this._companyService.uploadLogo(companyId, file);
  }

  @Delete('logo')
  @UseGuards(AuthGuard)
  @Roles(AccountRole.COMPANY)
  removeLogo(@Req() req: any) {
    const companyId = req.account._id;
    return this._companyService.removeLogo(companyId);
  }

  @Delete('me')
  @UseGuards(AuthGuard)
  @Roles(AccountRole.COMPANY)
  deleteMyAccount(@Req() req: any, @Body() dto: DeleteAccountDto) {
    return this._companyService.deleteMyAccount(req.user._id, dto);
  }
}
