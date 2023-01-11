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
      profileFields: ['picture.type(large)', 'emails', 'name', 'displayName'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, infor?: any) => void,
  ): Promise<void> {
    const { emails, name, provider, id } = profile;
    const picture = `https://graph.facebook.com/${id}/picture?width=200&height=200&access_token=${accessToken}`;
    const user = {
      id: id,
      email: emails[0].value,
      provider: provider,
      firstName: name.givenName,
      lastName: name.familyName,
    };

    return done(null, user);
  }
}
