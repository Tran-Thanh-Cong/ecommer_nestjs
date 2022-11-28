import { Module } from '@nestjs/common';

import { UsersModule } from './../users/users.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { RedisCacheModule } from '../../shared/redis-cache/redis-cache.module';

@Module({
  imports: [RedisCacheModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
