import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { LoggerModule } from '../../shared/logger/logger.module';

@Module({
  imports: [LoggerModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
