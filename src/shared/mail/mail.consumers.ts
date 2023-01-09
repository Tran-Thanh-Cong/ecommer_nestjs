import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';

import { MAIL_QUEUE } from '../constants/mail.queue';
import { LoggerService } from '../logger/logger.service';
import { MailService } from './services/mail.service';

@Processor(MAIL_QUEUE)
export class MailConsumer {
  constructor(
    private readonly logger: LoggerService,
    private readonly mailService: MailService,
  ) {
    this.logger.setContext(MailConsumer.name);
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processor:@OnQueueActive - Processing job ${job.id} of type ${
        job.name
      }. Data: ${JSON.stringify(job.data)}`,
    );
  }

  @OnQueueCompleted()
  onComplete(job: Job) {
    console.log(
      `Processor:@OnQueueCompleted - Completed job ${job.id} of type ${job.name}.`,
    );
  }

  @OnQueueFailed()
  onError(job: Job<any>, error: any) {
    this.logger.error(error.message);
    console.log(
      `Processor:@OnQueueFailed - Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );
  }

  @Process('send-mail-queue')
  sendVerifyMail(
    job: Job<{ email: string; user_id: number; token: string }>,
  ): Promise<any> {
    return this.mailService.accountConfirmEmail(
      job.data.email,
      job.data.user_id,
      job.data.token,
    );
  }
}
