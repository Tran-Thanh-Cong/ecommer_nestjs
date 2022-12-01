import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { mysqlConfig } from '../../shared/config/mysql.config';
import { MySqlModule } from '../../shared/database/mysql.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { LoggerModule } from '../../shared/logger/logger.module';
import { redisConfig } from '../../shared/config/redis.config';
import { mailConfig } from '../../shared/config/mail.config';
import { RedisCacheModule } from '../../shared/redis-cache/redis-cache.module';
import { MailModule } from '../../shared/mail/mail.module';
import { BcryptModule } from '../../shared/bcrypt/bcrypt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mysqlConfig, redisConfig, mailConfig],
      envFilePath: ['.env'],
    }),
    MySqlModule,
    RedisCacheModule,
    AuthModule,
    UsersModule,
    LoggerModule,
    MailModule,
    BcryptModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
