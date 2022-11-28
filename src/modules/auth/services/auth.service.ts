import { Injectable } from '@nestjs/common';

import { UsersService } from './../../users/services/users.service';
import { Register } from './../dtos/auth-register.dto';
import { UserRepository } from './../../users/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UsersService,
  ) {}

  async register(data: Register) {
    //check email is exits
    const isUserExits = this.userRepository.getUserByEmail(data.email);
    if (isUserExits) {
      return 'ton tai roi';
    }

    return await this.userRepository.createUser(data);
  }
}
