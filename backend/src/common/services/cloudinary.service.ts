import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { randomUUID } from 'crypto';
import type { UploadApiResponse } from 'cloudinary';

export type ImageFolder = 'COMPANY' | 'PROFILE';

export interface UploadedImage {
  url: string;
  publicId: string;
}
export interface UploadedFile {
  url: string;
  publicId: string;
}
@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
      secure: true,
    });
  }

  async uploadImage(
    file: Express.Multer.File,
    folder: ImageFolder,
    entityId: string,
  ): Promise<UploadedImage> {
    const publicId = randomUUID();

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `${folder}/${entityId}`,
          public_id: publicId,
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          if (!result) {
            reject(new Error('Cloudinary returned no result'));
            return;
          }

          resolve(result);
        },
      );

      stream.end(file.buffer);
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }

  async deleteImage(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
    });
  }

  async uploadPDF(pdfBuffer: Buffer, userId: string): Promise<UploadedFile> {
    const publicId = `${randomUUID()}.pdf`;

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `CV/${userId}`,
          public_id: publicId,
          resource_type: 'raw',
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          if (!result) {
            reject(new Error('Cloudinary returned no result'));
            return;
          }

          resolve(result);
        },
      );

      stream.end(pdfBuffer);
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }

  async deletePDF(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: 'raw',
    });
  }
}
