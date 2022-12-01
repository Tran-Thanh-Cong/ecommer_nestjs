import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(to: string, subject: string, template: string, context?: any) {
    await this.mailerService.sendMail({
      to: to,
      subject: 'Wellcom to application',
      template: template,
      context: {
        name: context.name,
        url: context.url,
      },
    });
  }
}
