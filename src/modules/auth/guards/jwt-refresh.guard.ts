import { UnauthorizedException } from '@nestjs/common/exceptions';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { Injectable, ExecutionContext } from '@nestjs/common';

import { AUTH_STRATEGY } from './../constants/auth-strategy.constant';

@Injectable()
export class JwtRefreshGuard extends AuthGuard(
  AUTH_STRATEGY.STRATEGY_JWT_REFRESH,
) {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, infor: any) {
    if (err || !user) {
      throw err || new UnauthorizedException(`${infor}`);
    }

    return user;
  }
}
