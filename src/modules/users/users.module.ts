import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { LoggerModule } from '../../shared/logger/logger.module';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LoggerModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UserRepository],
})
export class UsersModule {}
