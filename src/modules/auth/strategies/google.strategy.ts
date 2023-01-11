import { plainToClass } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { Profile, Strategy } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { OutputUserDto } from './../../users/dtos/output-user.dto';
import { UserRepository } from './../../users/repositories/users.repository';
import { LoggerService } from './../../../shared/logger/logger.service';
import { AUTH_PROVIDER } from '../constants/auth-provider.constant';
import { ROLE } from '../constants/role.constant';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy,
  AUTH_PROVIDER.GOOGLE,
) {
  constructor(
    private readonly configService: ConfigService,
    private logger: LoggerService,
    private userRepository: UserRepository,
  ) {
    super({
      clientID: configService.get<string>('google.clientID'),
      clientSecret: configService.get<string>('google.clientSecret'),
      callbackURL: configService.get<string>('google.callbackURL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<OutputUserDto> {
    const { id, name, emails, photos, provider } = profile;

    let user = await this.userRepository.findOneUser({
      provider: provider,
      socialId: id,
    });

    if (!user) {
      user = await this.userRepository.createUser({
        socialId: id,
        email: emails[0].value,
        isVerified: Boolean(emails[0].verified),
        role: [ROLE.USER],
        lastName: name.givenName,
        firstName: name.givenName,
        provider: provider,
        isAccountDisabled: false,
      });
    }

    return plainToClass(OutputUserDto, user, { excludeExtraneousValues: true });
  }
}
