import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import Bull, { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

import { User } from './../../../modules/users/entities/users.entity';
import { MAIL_QUEUE } from './../../constants/mail.queue';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class MailService {
  private readonly baseUrl: string;

  constructor(
    @InjectQueue(MAIL_QUEUE) private readonly mailQueue: Queue,
    private readonly mailerService: MailerService,
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
  ) {
    this.baseUrl = this.config.get<string>('BASE_URL');
    this.logger.setContext(MailService.name);
  }

  //send mail
  async accountConfirmEmail(
    email: string,
    user_id: number,
    token: string,
  ): Promise<any> {
    try {
      const mailOptions: ISendMailOptions = {
        to: email,
        subject: 'Wellcom to application! Please to confirm email to register',
        template: '../templates/confirmation.hbs',
        context: {
          name: email,
          url: `${this.baseUrl}/api/v1/auth/verify-email?token=${token}`,
        },
      };

      return this.mailerService.sendMail(mailOptions);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  //add send mail to queue
  sendMailQueue(
    email: string,
    user_id: number,
    token: string,
  ): Promise<Bull.Job<any>> {
    try {
      return this.mailQueue.add(
        'send-mail-queue',
        { email: email, user_id: user_id, token: token },
        {
          delay: 5000,
          lifo: true,
          removeOnComplete: true,
          jobId: user_id,
        },
      );
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
