import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.findOne({ where: { email: email } });
    if (user) {
      throw new HttpException('User exist', HttpStatus.FOUND);
    }
    return user;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const user = this.create({
      username: data.username,
      email: data.email,
      password: data.password,
    });
    await this.save(user);
    return user;
  }
}
