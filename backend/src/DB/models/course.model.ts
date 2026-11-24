
import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CourseLevel, CourseStatus } from '../../common/enums/index.js';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop({ type: String, required: true, trim: true })
  title: string;

  @Prop({ type: String, required: true, trim: true })
  category: string;

  @Prop({ type: String, required: true, trim: true })
  technology: string;

  @Prop({ type: String, required: true, trim: true })
  courseLink: string;

  @Prop({ type: String, required: true, trim: true })
  description: string;

  @Prop({
    type: String,
    enum: CourseStatus,
    default: CourseStatus.ACTIVE,
  })
  status: CourseStatus;

  @Prop({ type: String })
  imageUrl?: string;

  @Prop({ type: String })
  imagePublicId?: string;

  @Prop({ type: String, enum: CourseLevel, required: true })
  level: CourseLevel;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

CourseSchema.index({ status: 1, createdAt: -1 });
CourseSchema.index({ category: 1, level: 1, status: 1 });
CourseSchema.index({
  title: 'text',
  description: 'text',
  category: 'text',
  technology: 'text',
});

export const CourseModel = MongooseModule.forFeature([
  { name: Course.name, schema: CourseSchema },
]);
