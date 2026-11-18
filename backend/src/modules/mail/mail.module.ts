import { Module } from '@nestjs/common';
import { MailService } from './mail.service.js';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { dirname, join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/adapters/ejs.adapter.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service: 'gmail',
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASS'),
          },
          connectionTimeout: 10000,
          greetingTimeout: 10000,
          socketTimeout: 10000,
        },
        defaults: {
          from: `"No Reply"<${configService.get<string>('MAIL_USER')}>`,
        },
        template: {
          dir: join(__dirname, 'template'),
          adapter: new EjsAdapter(),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
