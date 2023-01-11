import { FacebookLoginOutputDto } from './../dtos/facebook-login-output.dto';
import { FacebookGuard } from './../guards/facebook.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  UseGuards,
  HttpCode,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';

import { GoogleGuard } from './../guards/google.guard';
import { AuthTokenOutputDto } from '../dtos/auth-token-output.dto';
import { OutputUserDto } from './../../users/dtos/output-user.dto';
import { LocalAuthGuard } from './../guards/local-auth.guard';
import { OptionAuthRegister } from './../../../shared/utils/types/options-auth-register.type';
import { AuthLoginInputDto } from './../dtos/auth-login-input.dto';
import { MailService } from '../../../shared/mail/services/mail.service';
import { AuthRegisterInputDto } from '../dtos/auth-register-input.dto';
import { AuthRegisterOutputDto } from '../dtos/auth-register-output.dto';
import { AuthService } from '../services/auth.service';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { GoogleLoginOutputDto } from '../dtos/google-login-output.dto';

declare global {
  namespace Express {
    interface User {
      id: string;
    }
  }
}

@ApiTags('Authentication')
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
    status: HttpStatus.CREATED,
    description: 'Register successfully',
    type: AuthRegisterOutputDto,
  })
  @ApiBody({
    type: AuthRegisterInputDto,
  })
  async register(@Body() data: AuthRegisterInputDto & OptionAuthRegister) {
    const user = await this.authService.register(data);

    this.mailService.sendMailQueue(user.email, user.id, user.token);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Please verify email',
    };
  }

  @Get('verify-email')
  @ApiOperation({
    summary: 'Verify email api',
  })
  @ApiQuery({
    example: 'token',
  })
  verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login with email',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AuthTokenOutputDto,
  })
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: Request, @Body() credential: AuthLoginInputDto) {
    const user = plainToClass(OutputUserDto, req.user, {
      excludeExtraneousValues: true,
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Login successfully',
      data: await this.authService.login(user),
    };
  }

  @Get('google/login')
  @ApiOperation({ summary: 'Login with google' })
  @UseGuards(GoogleGuard)
  googleLogin() {}

  @Get('google/redirect')
  @ApiOperation({ summary: 'Login with google redirect' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GoogleLoginOutputDto,
  })
  @UseGuards(GoogleGuard)
  @HttpCode(HttpStatus.OK)
  async googleRedirect(@Req() req: Request) {
    const user = plainToClass(OutputUserDto, req.user, {
      excludeExtraneousValues: true,
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Login with google successfully',
      data: await this.authService.login(user),
    };
  }

  @Get('facebook/login')
  @ApiOperation({ summary: 'Login with facebook' })
  @UseGuards(FacebookGuard)
  facebookLogin() {}

  @Get('facebook/redirect')
  @ApiOperation({ summary: 'Login with google redirect' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FacebookLoginOutputDto,
  })
  @UseGuards(FacebookGuard)
  @HttpCode(HttpStatus.OK)
  async facebookRedirect(@Req() req: Request) {
    return req.user;
  }

  @Post('refresh-token')
  @UseGuards(JwtRefreshGuard)
  @ApiOperation({
    summary: 'Refresh access token api',
  })
  @ApiHeader({ name: 'refresh_token' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AuthTokenOutputDto,
  })
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Req() req: Request) {
    const user_id = parseInt(req.user.id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Refresh token successfully',
      data: await this.authService.refresheToken(user_id),
    };
  }
}
