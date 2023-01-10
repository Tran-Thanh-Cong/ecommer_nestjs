import { registerAs } from '@nestjs/config';

export const facebookConfig = registerAs('facebook', () => ({
  clientID: process.env.CLIENT_ID_FB,
  clientSecret: process.env.CLIENT_SECRET_FB,
  callbackURL: process.env.CALLBACK_URL_FB,
}));
