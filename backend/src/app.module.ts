import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './modules/Auth/auth.module.js';
import { JobsModule } from './modules/Jobs/jobs.module.js';
import { CompanyModule } from './modules/Company/company.module.js';
import { ApplicationModule } from './modules/Application/application.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { resolve } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: resolve('./.env'),
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'),
        onConnectionCreate: (connection: Connection) => {
          connection.on('connected', () => {
            console.log('Connected to MongoDB ');
          });
        },
      }),
      inject: [ConfigService],
    }),

    AuthModule,
    JobsModule,
    CompanyModule,
    ApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
