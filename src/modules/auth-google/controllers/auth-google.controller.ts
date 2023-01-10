import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { GoogleGuard } from './../guards/google.guard';
import { AuthGoogleService } from './../services/auth-google.service';

@Controller('auth-google')
@UseGuards(GoogleGuard)
export class AuthGoogleController {
  constructor(private readonly authGoogleService: AuthGoogleService) {}

  @Get('login')
  @HttpCode(HttpStatus.OK)
  async googleLogin(@Req() req: Request) {}

  @Get('redirect')
  async redirect(@Req() req: Request) {
    return req.user;
  }
}
