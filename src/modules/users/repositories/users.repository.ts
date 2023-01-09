import { Injectable } from '@nestjs/common';
import { DataSource, Repository, UpdateResult, DeleteResult } from 'typeorm';

import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { EntityCondition } from '../../../shared/utils/types/entity-condition.type';
import { IPaginationOptions } from '../../../shared/utils/types/pagination-option.type';
import { User } from '../entities/users.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  createUser(data: CreateUserDto): Promise<User> {
    const user = this.create({ ...data });
    return this.save(user);
  }

  findManyUserWithPagination(
    paginationoptions: IPaginationOptions,
  ): Promise<User[]> {
    return this.find({
      skip: (paginationoptions.page - 1) * paginationoptions.limit,
      take: paginationoptions.limit,
    });
  }

  findOneUser(fields: EntityCondition<User>): Promise<User> {
    return this.findOne({
      where: fields,
    });
  }

  updateUser(id: number, data: UpdateUserDto): Promise<UpdateResult> {
    return this.update(id, {
      ...data,
    });
  }

  deleteUser(id: number): Promise<DeleteResult> {
    return this.delete(id);
  }

  softDelete(id: number): Promise<UpdateResult> {
    return this.softDelete(id);
  }
}
