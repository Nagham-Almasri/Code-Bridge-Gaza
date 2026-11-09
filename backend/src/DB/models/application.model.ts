import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ApplicationStatus } from '../../common/enums/index.js';

export type ApplicationDocument = HydratedDocument<Application>;

@Schema({ timestamps: true })

export class Application {
    @Prop({type: Types.ObjectId, ref: 'User', required: true})
    user: Types.ObjectId;

    @Prop({type: Types.ObjectId, ref: 'Job', required: true, index: true})
    job: Types.ObjectId;

    @Prop({type: String, enum: ApplicationStatus, default: ApplicationStatus.PENDING})
    status: ApplicationStatus;

}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
ApplicationSchema.index({ user:1, job: 1}, {unique: true});

export const ApplicationModel = MongooseModule.forFeature([{ name: Application.name, schema: ApplicationSchema }]);
