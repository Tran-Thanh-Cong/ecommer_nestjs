import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { FacebookGuard } from '../guards/facebook.guard';

@Controller('auth-facebook')
@UseGuards(FacebookGuard)
export class AuthFacebookController {
  @Get('login')
  login() {}

  @Get('redirect')
  redirect(@Req() req: Request) {
    return req.user;
  }
}
