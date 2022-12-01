import { Controller, Get, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { MailService } from '../../../shared/mail/mail.service';
import { RedisCacheService } from '../../../shared/redis-cache/redis-cache.service';
import { RegisterInputDto } from '../dtos/auth-register-input.dto';
import { RegisterOutputDto } from '../dtos/auth-register-output.dto';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

  @Post('register')
  @ApiOperation({
    summary: 'User register api',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Register successfully',
    type: RegisterOutputDto,
  })
  @ApiBody({
    type: [RegisterInputDto],
  })
  async register(@Body() data: RegisterInputDto) {
    const user = await this.authService.register(data);
    if (user) {
      await this.mailService.sendMail(
        user.email,
        'verify email',
        '../../../shared/mail/templates/confirmation',
        {
          name: user.username,
          url: 'https://www.youtube.com/watch?v=lZmsY0e2ojQ&t=149s&ab_channel=AmitavRoy',
        },
      );
    }
  }
}
