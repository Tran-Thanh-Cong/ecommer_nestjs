import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { LoggerService } from './../../../shared/logger/logger.service';
import { AuthService } from './../services/auth.service';
import { AUTH_STRATEGY } from './../constants/auth-strategy.constant';
import { OutputUserDto } from './../../users/dtos/output-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  AUTH_STRATEGY.STRATEGY_LOCAL,
) {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: LoggerService,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
    this.logger.setContext(LocalStrategy.name);
  }

  validate(email: string, password: string): Promise<OutputUserDto> {
    return this.authService.validateUser(email, password);
  }
}
