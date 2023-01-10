import { Module } from '@nestjs/common';

import { AuthGoogleController } from './controllers/auth-google.controller';
import { AuthGoogleService } from './services/auth-google.service';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [],
  controllers: [AuthGoogleController],
  providers: [GoogleStrategy, AuthGoogleService],
  exports: [],
})
export class AuthGoogleModule {}
