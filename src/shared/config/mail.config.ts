import { registerAs } from '@nestjs/config';

export const mailConfig = registerAs('mail', () => ({
  host: process.env.MAIL_HOST,
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASSWORD,
}));
