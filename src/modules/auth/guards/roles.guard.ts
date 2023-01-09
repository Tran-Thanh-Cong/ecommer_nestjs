import { ROLE } from './../constants/role.constant';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLE_KEYS } from '../../../shared/decorator/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<ROLE[]>(ROLE_KEYS, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles.length) {
      return false;
    }

    const { user } = context.switchToHttp().getRequest();

    return true;
  }
}
