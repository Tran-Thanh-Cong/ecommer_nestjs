import { BcryptModule } from './../../shared/bcrypt/bcrypt.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { LoggerModule } from '../../shared/logger/logger.module';
import { UserRepository } from './repositories/users.repository';
import { User } from './entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LoggerModule, BcryptModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
