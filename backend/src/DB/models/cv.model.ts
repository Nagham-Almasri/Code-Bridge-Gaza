import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
@Schema({ _id: false })
export class Education {
  @Prop({ required: true, trim: true })
  university: string;

  @Prop({ required: true, trim: true })
  degree: string;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date })
  endDate?: Date;

  @Prop({ trim: true })
  gpa?: string;
}

export const EducationSchema = SchemaFactory.createForClass(Education);
@Schema({ _id: false })
export class Experience {
  @Prop({ required: true, trim: true })
  jobTitle: string;

  @Prop({ required: true, trim: true })
  company: string;

  @Prop({ trim: true })
  duration?: string;

  @Prop({ trim: true })
  location?: string;

  @Prop({ trim: true })
  description?: string;
}
export const ExperienceSchema = SchemaFactory.createForClass(Experience);
@Schema({ _id: false })
export class Language {
  @Prop({ required: true, trim: true })
  language: string;

  @Prop({ required: true, trim: true })
  proficiency: string;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
@Schema({ timestamps: true })
export class CV {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  })
  user: Types.ObjectId;

  @Prop()
  professionalSummary?: string;

  @Prop({
    type: [EducationSchema],
    default: [],
  })
  education: Education[];

  @Prop({
    type: [ExperienceSchema],
    default: [],
  })
  experience: Experience[];
  @Prop({ type: [LanguageSchema], default: [] })
  languages: Language[];
  @Prop()
  pdfUrl?: string;

  @Prop()
  pdfPublicId?: string;
}
export const CVSchema = SchemaFactory.createForClass(CV);
export type CVDocument = HydratedDocument<CV>;
export const CVModel = MongooseModule.forFeature([
  { name: CV.name, schema: CVSchema },
]);
