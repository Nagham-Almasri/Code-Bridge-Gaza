import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly _mailService: MailerService) {}
  async sendVerficationOtp(
    email: string,
    otp: string,
    name: string,
  ): Promise<void> {
    try {
      await this._mailService.sendMail({
        to: email,
        subject: 'Your Account Activation Code',
        template: './otp',
        context: {
          name,
          code: otp,
          title: 'Verify your email',
          message:
            'Welcome to CodeBridge Gaza! Use the code below to confirm your email address and activate your account.',
          expiresInMinutes: '10 min',
        },
      });
    } catch (error: any) {
      this.logger.error(
        `Failed to send OTP email to ${email}`,
        (error as Error).stack,
      );
    }
  }

  async sendResetPasswordOtp(
    email: string,
    otp: string,
    name: string,
  ):Promise<void>{
    try{
      await this._mailService.sendMail({
        to: email,
        subject: "Your Password Reset Code",
        template: "./otp",
        context: {
          name,
          code: otp,
          title: "Reset Your Password",
          message: "We received a request to reset your CodeBridge Gaza password. Use the code below to choose a new password. If you did not request this, you can safely ignore this email.",
          expiresInMinutes: "5 min",
        },
      });
    }catch(error: any){
      this.logger.error(`Failed to send reset password email to ${email}`,
        (error as Error).stack,
      );
    }
  }
}
