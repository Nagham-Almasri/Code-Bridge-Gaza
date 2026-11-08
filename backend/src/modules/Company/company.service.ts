import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company, HCompanyDocument } from '../../DB/models/company.model.js';
import { Model, Types } from 'mongoose';
import { AddCompanyDto } from './dto/add-company.dto.js';
import { UpdateCompanyDto } from './dto/update-company.dto.js';
import { createOtp } from '../../common/security/otp.js';
import { MailService } from '../mail/mail.service.js';
import { compare } from '../../common/security/hash.js';
import { DeleteAccountDto } from './dto/delete-company.dto.js';
import { SearchCompanyDto } from './dto/search-company.dto.js';
import { AccountStatus } from '../../common/enums/index.js';
@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private readonly _companyModel: Model<HCompanyDocument>,
    private readonly _mailService: MailService,
  ) {}
  async addCompany(addCompanyDto: AddCompanyDto) {
    const existsCompany = await this._companyModel.findOne({
      $or: [
        { email: addCompanyDto.email },
        { companyName: addCompanyDto.companyName },
      ],
    });
    if (existsCompany)
      throw new ConflictException('Company name or email already exists');
    const { otp, hashedOtp, expiresAt } = await createOtp();

    const newCompany = new this._companyModel({
      ...addCompanyDto,
      confirmEmailOtp: hashedOtp,
      emailOtpExpiresAt: expiresAt,
    });
    newCompany.save();

    await this._mailService.sendVerficationOtp(
      newCompany.email,
      otp,
      newCompany.companyName,
    );
    return {
      message: 'Company created and is waiting for admin approval',
      company: {
        id: newCompany._id,
        companyName: newCompany.companyName,
        email: newCompany.email,
      },
    };
  }
  async updateCompany(
    companyId: Types.ObjectId,
    updateCompanyDto: UpdateCompanyDto,
  ) {
    const company = await this._companyModel.findByIdAndUpdate(
      companyId,
      { $set: updateCompanyDto },
      { new: true, runValidators: true },
    );
    if (!company) throw new NotFoundException('Company not found');

    return {
      message: 'Company updated successfully',
      company: {
        id: company._id,
        companyName: company.companyName,
        description: company.description,
        address: company.address,
      },
    };
  }
  async getCompanyById(companyId: Types.ObjectId) {
    const company = await this._companyModel.findById(companyId);
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }
  async searchCompany(searchCompanyDto: SearchCompanyDto) {
    const { search, limit = 10, page = 1 } = searchCompanyDto;
    const skip = (page - 1) * limit;
    const filter: Record<string, unknown> = {
      approvedByAdmin: true,
      status: AccountStatus.ACTIVE,
    };
    if (search) filter.companyName = { $regex: search, $options: 'i' };

    const [companies, total] = await Promise.all([
      this._companyModel
        .find(filter)
        .select('companyName description address logo')
        .skip(skip)
        .limit(limit),
      this._companyModel.countDocuments(filter),
    ]);
    return {
      companies: companies.map((company) => ({
        id: company._id,
        companyName: company.companyName,
        description: company.description,
        address: company.address,
        logo: company.logo,
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  async deleteMyAccount(companyId: string, dto: DeleteAccountDto) {
    const company = await this._companyModel.findById(companyId);
    if (!company) throw new NotFoundException('Company not found');

    if (!(await compare(dto.password, company.password)))
      throw new UnauthorizedException('Incorrect password');

    await company.deleteOne();

    return { message: 'Account deleted successfully' };
  }
}
