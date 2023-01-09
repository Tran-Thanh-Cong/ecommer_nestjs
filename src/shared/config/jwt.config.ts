import { registerAs } from '@nestjs/config';
import { readFileSync } from 'fs';

export const jwtConfig = registerAs('jwt', () => ({
  publicKey: readFileSync('certs/public.pem'),
  privateKey: readFileSync('certs/private.pem'),
  accessTokenExpiresInSec: parseInt(
    process.env.ACCESS_TOKEN_EXPIRES_IN_SEC,
    10,
  ),
  refreshTokenExpiresInSec: parseInt(
    process.env.REFRESH_TOKEN_EXPIRES_IN_SEC,
    10,
  ),
}));
