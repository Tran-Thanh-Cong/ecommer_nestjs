import { ConfigService } from '@nestjs/config';
import { Profile, Strategy } from 'passport-facebook';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { AUTH_PROVIDER } from '../constants/auth-provider.constant';

@Injectable()
export class FacebookStrategy extends PassportStrategy(
  Strategy,
  AUTH_PROVIDER.FACEBOOK,
) {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('facebook.clientID'),
      clientSecret: configService.get<string>('facebook.clientSecret'),
      callbackURL: configService.get<string>('facebook.callbackURL'),
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, infor?: any) => void,
  ): Promise<void> {
    const {
      name,
      _json,
      _raw,
      birthday,
      provider,
      emails,
      photos,
      username,
      id,
      displayName,
    } = profile;

    console.log(profile);

    const user = {
      id: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    };

    const payload = {
      user,
      accessToken,
    };

    return done(null, payload);
  }
}
