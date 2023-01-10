import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { ROLE } from './../constants/role.constant';
import { AUTH_STRATEGY } from './../constants/auth-strategy.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  AUTH_STRATEGY.STRATEGY_JWT_AUTH,
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.publicKey'),
      algorithms: ['RS256'],
    });
  }

  async validate(
    payload: any,
  ): Promise<{ id: number; email: string; roles: ROLE[] }> {
    return {
      id: payload.sub,
      email: payload.email,
      roles: payload.roles,
    };
  }
}
