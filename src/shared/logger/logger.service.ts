import { Injectable, Scope } from '@nestjs/common';

import { Logger, transports, createLogger } from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
  private logger: Logger;

  constructor() {
    this.logger = createLogger({
      transports: [
        new transports.Console(),
        new transports.File({ filename: 'src/shared/log/combined.log' }),
      ],
    });
  }

  error(
    message: string,
    controller?: string,
    meta?: Record<string, any>,
  ): Logger {
    const timestamp = new Date().toISOString();
    return this.logger.warn({
      message,
      controller,
      timestamp,
      ...meta,
    });
  }

  log(
    message: string,
    controller?: string,
    meta?: Record<string, any>,
  ): Logger {
    const timestamp = new Date().toISOString();
    return this.logger.info({
      message,
      controller,
      timestamp,
      ...meta,
    });
  }
}
