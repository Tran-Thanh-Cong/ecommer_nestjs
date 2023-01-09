import { plainToClass } from 'class-transformer';
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
import { Request } from 'express';

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
    summary: 'Verify email',
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
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
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

  @Post('refresh-token')
  @ApiOperation({
    summary: 'Refresh access token API',
  })
  @ApiHeader({ name: 'refresh_token' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AuthTokenOutputDto,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshGuard)
  async refreshToken(@Req() req: Request) {
    const user_id = parseInt(req.user.id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Refresh token successfully',
      data: await this.authService.refresheToken(user_id),
    };
  }
}
