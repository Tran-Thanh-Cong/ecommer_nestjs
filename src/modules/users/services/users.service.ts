import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { UpdateUserDto } from './../dtos/update-user.dto';
import { EntityCondition } from './../../../shared/utils/types/entity-condition.type';
import { infinityPagination } from './../../../shared/utils/infinity-pagination';
import { User } from '../entities/users.entity';
import { BcryptService } from './../../../shared/bcrypt/bcrypt.service';
import { LoggerService } from './../../../shared/logger/logger.service';
import { CreateUserDto } from './../dtos/create-user.dto';
import { UserRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: LoggerService,
    private readonly bcrypt: BcryptService,
  ) {
    this.logger.setContext(UsersService.name);
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const { email, password } = data;

    const [user, hashPassword] = await Promise.all([
      this.userRepository.findOneUser({ email }),
      this.bcrypt.hash(password),
    ]);

    if (user) {
      this.logger.error('User already exist');
      throw new HttpException('user already exist', HttpStatus.FOUND);
    }

    const newData = {
      ...data,
      email: email,
      password: hashPassword,
    };

    return this.userRepository.createUser(newData);
  }

  async findAllUser(
    page: number,
    limit: number,
  ): Promise<{ data: User[]; hasNextPage: boolean }> {
    if (limit > 20) {
      limit = 20;
    }

    const data: User[] = await this.userRepository.findManyUserWithPagination({
      page,
      limit,
    });

    return infinityPagination(data, { page, limit });
  }

  async findOneUser(fields: EntityCondition<User>): Promise<User> {
    const user: User = await this.userRepository.findOneUser(fields);

    if (!user) {
      this.logger.error('User not found');
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async updateUser(id: number, data: UpdateUserDto) {
    const user: User = await this.userRepository.findOneUser({ id: id });

    if (!user) {
      this.logger.error('User not found');
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.userRepository.updateUser(id, data);
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    const user: User = await this.userRepository.findOneUser({ id: id });

    if (!user) {
      this.logger.error('User not found');
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.userRepository.deleteUser(id);
  }
}
