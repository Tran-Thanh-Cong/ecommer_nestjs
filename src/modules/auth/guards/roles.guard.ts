import { UnauthorizedException } from '@nestjs/common/exceptions';
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
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (roles.some((role) => user.roles?.includes(role))) {
      return true;
    }

    throw new UnauthorizedException(
      `User with roles ${user.roles} does not  have access to this route with role ${roles}`,
    );
  }
}
