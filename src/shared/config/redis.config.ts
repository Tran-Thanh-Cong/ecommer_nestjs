import { registerAs } from '@nestjs/config';

export const redisConfig = registerAs('redis', () => ({
  host: process.env.REDIS_HOST,
  port: Number.parseInt(process.env.REDIS_PORT, 10),
}));
