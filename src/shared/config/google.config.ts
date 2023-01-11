import { registerAs } from '@nestjs/config';

export const googleConfig = registerAs('google', () => ({
  clientID: process.env.CLIENT_ID_GOOGLE,
  clientSecret: process.env.CLIENT_SECRET_GOOGLE,
  callbackURL: process.env.CALLBACK_URL_GOOGLE,
}));
