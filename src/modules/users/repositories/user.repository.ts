import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

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
}
