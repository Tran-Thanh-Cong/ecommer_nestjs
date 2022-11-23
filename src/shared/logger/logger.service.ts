import { Injectable, Scope } from '@nestjs/common';
import { Logger, transports, createLogger } from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
  private context?: string;
  private logger: Logger;

  public setContext(context: string): void {
    this.context = context;
  }

  constructor() {
    this.logger = createLogger({
      transports: [
        new transports.Console(),
        new transports.File({ filename: 'combined.log' }),
      ],
    });
  }

  error(message: string, meta?: Record<string, any>): Logger {
    const timestamp = new Date().toISOString();
    return this.logger.warn({
      message,
      timestamp,
      ...meta,
    });
  }

  log(message: string, meta?: Record<string, any>): Logger {
    const timestamp = new Date().toISOString();
    return this.logger.info({
      message,
      timestamp,
      ...meta,
    });
  }
}
