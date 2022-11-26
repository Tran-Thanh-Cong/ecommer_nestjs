import { Controller, Get } from '@nestjs/common';

import { RedisCacheService } from '../../../shared/redis-cache/redis-cache.service';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cachService: RedisCacheService,
  ) {}
}
