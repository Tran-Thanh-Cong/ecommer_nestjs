import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { RegisterInputDto } from './../dtos/auth-register-input.dto';
import { UserRepository } from './../../users/repositories/user.repository';
import { LoggerService } from '../../../shared/logger/logger.service';
import { BcryptService } from '../../../shared/bcrypt/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
    private readonly logger: LoggerService,
  ) {}

  async register(data: RegisterInputDto) {
    try {
      const user = await this.userRepository.findByEmail(data.email);
      if (user) {
        throw new HttpException('User exist', HttpStatus.FOUND);
      }
      const dataRequest = {
        ...data,
        password: await this.bcryptService.hash(data.password),
      };
      return await this.userRepository.createUser(dataRequest);
    } catch (error) {
      this.logger.error(error.message, AuthService.name);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
