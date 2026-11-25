import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCVDto } from './dto/create-cv.dto.js';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../DB/models/user.model.js';
import { CV, CVDocument } from '../../DB/models/cv.model.js';
import { CloudinaryService } from '../../common/services/cloudinary.service.js';

@Injectable()
export class CvService {
  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<UserDocument>,
    @InjectModel(CV.name)
    private readonly _cvModel: Model<CVDocument>,
    private readonly _cloudinaryService: CloudinaryService,
  ) {}
  async getMyCv(userId: Types.ObjectId) {
    const [user, cv] = await Promise.all([
      this._userModel
        .findById(userId)
        .select(
          'fullName email phone location bio skills major jobTitle experienceLevel',
        ),
      this._cvModel.findOne({ user: userId }),
    ]);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      success: true,
      results: {
        personalInfo: {
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          location: user.location,
          major: user.major,
          jobTitle: user.jobTitle,
          experienceLevel: user.experienceLevel,
        },

        professionalSummary: cv?.professionalSummary?.trim() || user.bio || '',

        skills: user.skills,

        education: cv?.education ?? [],
        experience: cv?.experience ?? [],
        languages: cv?.languages ?? [],

        pdfUrl: cv?.pdfUrl ?? null,
      },
    };
  }

  async saveCV(userId: Types.ObjectId, dto: CreateCVDto) {
    const cv = await this._cvModel.findOneAndUpdate(
      { user: userId },
      {
        $set: {
          professionalSummary: dto.professionalSummary,
          education: dto.education,
          experience: dto.experience,
          languages: dto.languages,
        },
        $setOnInsert: {
          user: userId,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      },
    );

    return {
      success: true,
      message: 'CV saved successfully',
      results: cv,
    };
  }

  async generateCV(userId: Types.ObjectId, file: Express.Multer.File) {
    const cv = await this._cvModel.findOne({ user: userId });
    if (!cv) throw new NotFoundException('Please save your CV first');
    if (!file) throw new BadRequestException('PDF file is required');
    const uploaded = await this._cloudinaryService.uploadPDF(
      file.buffer,
      userId.toString(),
    );
    const oldPublicId = cv.pdfPublicId;
    try {
      await this._cvModel.findOneAndUpdate(
        { user: userId },
        {
          $set: {
            pdfUrl: uploaded.url,
            pdfPublicId: uploaded.publicId,
          },
        },
        { new: true },
      );
    } catch (error) {
      await this._cloudinaryService
        .deletePDF(uploaded.publicId)
        .catch(() => undefined);
      throw error;
    }
    if (oldPublicId && oldPublicId !== uploaded.publicId) {
      await this._cloudinaryService.deletePDF(oldPublicId).catch((error) => {
        console.error('Failed to delete old CV PDF:', error);
      });
    }
    return {
      success: true,
      message: 'CV uploaded successfully',
      results: {
        pdfUrl: uploaded.url,
      },
    };
  }
}
