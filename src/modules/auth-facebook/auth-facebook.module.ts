import { Module } from '@nestjs/common';

import { AuthFacebookController } from './controllers/auth-facebook.controller';
import { AuthFacebookService } from './services/auth-facebook.service';
//import { FacebookStrategy } from './strategies/facebook.strategy';

@Module({
  imports: [],
  controllers: [AuthFacebookController],
  providers: [AuthFacebookService],
  exports: [],
})
export class AuthFacebookModule {}
