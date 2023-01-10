import { Reflector } from '@nestjs/core';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { AuthGuard } from '@nestjs/passport';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

import { AUTH_STRATEGY } from './../constants/auth-strategy.constant';

@Injectable()
export class JwtAuthGuard extends AuthGuard(AUTH_STRATEGY.STRATEGY_JWT_AUTH) {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(error: any, user: any, infor: any) {
    if (error || !user) {
      throw new UnauthorizedException(`${infor}`);
    }

    return user;
  }
}
