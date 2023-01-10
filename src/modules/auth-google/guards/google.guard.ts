import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { AUTH_PROVIDER } from './../../../shared/constants/auth-provider.constant';

@Injectable()
export class GoogleGuard extends AuthGuard(AUTH_PROVIDER.GOOGLE) {}
