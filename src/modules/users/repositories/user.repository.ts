import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getUserByEmail(email: string) {
    const user = await this.findOne({ where: { email: email } });
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    return this.create(data);
  }
}
