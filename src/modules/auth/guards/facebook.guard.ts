import { AuthGuard } from '@nestjs/passport';

import { AUTH_PROVIDER } from '../constants/auth-provider.constant';

export class FacebookGuard extends AuthGuard(AUTH_PROVIDER.FACEBOOK) {}
