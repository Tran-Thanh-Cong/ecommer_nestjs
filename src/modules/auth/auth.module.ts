import { Module } from '@nestjs/common';

import { UsersModule } from './../users/users.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { RedisCacheModule } from '../../shared/redis-cache/redis-cache.module';
import { LoggerModule } from '../../shared/logger/logger.module';
import { BcryptModule } from '../../shared/bcrypt/bcrypt.module';
import { MailModule } from '../../shared/mail/mail.module';

@Module({
  imports: [
    RedisCacheModule,
    UsersModule,
    LoggerModule,
    BcryptModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
