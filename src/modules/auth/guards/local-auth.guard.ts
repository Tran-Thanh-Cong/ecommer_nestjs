import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AUTH_STRATEGY } from './../constants/auth-strategy.constant';

@Injectable()
export class LocalAuthGuard extends AuthGuard(AUTH_STRATEGY.STRATEGY_LOCAL) {}
