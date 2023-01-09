import { Logger, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('REQUEST');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl } = req;

    this.logger.log(
      `${method} {${originalUrl}} - BODY: ${JSON.stringify(
        req.body,
      )} - PARAM: ${JSON.stringify(req.params)}`,
    );

    next();
  }
}
