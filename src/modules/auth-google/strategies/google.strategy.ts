import { ConfigService } from '@nestjs/config';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { AUTH_PROVIDER } from './../../../shared/constants/auth-provider.constant';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy,
  AUTH_PROVIDER.GOOGLE,
) {
  constructor(private configService: ConfigService) {
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
    done: VerifyCallback,
  ): Promise<void> {
    const { id, name, emails, photos, provider, _json, _raw } = profile;
    console.log({ _json, _raw });
    const user = {
      id: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    return done(null, user);
  }
}
