import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './strategies/jwt-auth.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from './../users/users.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { RedisCacheModule } from '../../shared/redis-cache/redis-cache.module';
import { LoggerModule } from '../../shared/logger/logger.module';
import { BcryptModule } from '../../shared/bcrypt/bcrypt.module';
import { MailModule } from '../../shared/mail/mail.module';
import { AUTH_STRATEGY } from './constants/auth-strategy.constant';

@Module({
  imports: [
    RedisCacheModule,
    UsersModule,
    LoggerModule,
    BcryptModule,
    MailModule,
    PassportModule.register({
      defaultStrategy: AUTH_STRATEGY.STRATEGY_JWT_AUTH,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        publicKey: configService.get<string>('jwt.publicKey'),
        privateKey: configService.get<string>('jwt.privateKey'),
        signOptions: {
          algorithm: 'RS256',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtRefreshStrategy, JwtStrategy],
})
export class AuthModule {}
