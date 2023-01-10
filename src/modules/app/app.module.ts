import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { facebookConfig } from './../../shared/config/facebook.config';
import { AuthFacebookModule } from './../auth-facebook/auth-facebook.module';
import { AuthGoogleModule } from './../auth-google/auth-google.module';
import { jwtConfig } from './../../shared/config/jwt.config';
import { googleConfig } from './../../shared/config/google.config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './../../shared/middleware/logger.middleware';
import { mysqlConfig } from '../../shared/config/mysql.config';
import { MysqlModule } from '../../shared/database/mysql/mysql.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { LoggerModule } from '../../shared/logger/logger.module';
import { redisConfig } from '../../shared/config/redis.config';
import { mailConfig } from '../../shared/config/mail.config';
import { RedisCacheModule } from '../../shared/redis-cache/redis-cache.module';
import { MailModule } from '../../shared/mail/mail.module';
import { BcryptModule } from '../../shared/bcrypt/bcrypt.module';
import { QueueModule } from '../../shared/queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        mysqlConfig,
        redisConfig,
        mailConfig,
        jwtConfig,
        googleConfig,
        facebookConfig,
      ],
      envFilePath: ['.env'],
    }),
    MysqlModule,
    RedisCacheModule,
    AuthModule,
    AuthGoogleModule,
    AuthFacebookModule,
    UsersModule,
    LoggerModule,
    MailModule,
    BcryptModule,
    QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
