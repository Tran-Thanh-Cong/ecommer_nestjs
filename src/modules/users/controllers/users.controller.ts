import { Controller, Get } from '@nestjs/common';

import { LoggerService } from '../../../shared/logger/logger.service';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: LoggerService,
  ) {}

  @Get('test')
  test() {
    console.log('aaa');
    return this.logger.log('haha');
  }
}
