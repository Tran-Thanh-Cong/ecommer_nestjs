import { registerAs } from '@nestjs/config';

export const googleConfig = registerAs('google', () => ({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
}));
