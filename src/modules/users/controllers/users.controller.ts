import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '../../../shared/logger/logger.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
  ) {}
  @Get('test')
  test() {
    this.loggerService.log('hehehe');
  }
}
