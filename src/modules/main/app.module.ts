import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import databaseConfig from '../../shared/config/database.config';
import { MySqlModule } from '../../shared/database/mysql.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { LoggerModule } from '../../shared/logger/logger.module';
import redisConfig from '../../shared/config/redis.config';
import { RedisCacheModule } from '../../shared/redis-cache/redis-cache.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, redisConfig],
      envFilePath: ['.env'],
    }),
    MySqlModule,
    RedisCacheModule,
    AuthModule,
    UsersModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
