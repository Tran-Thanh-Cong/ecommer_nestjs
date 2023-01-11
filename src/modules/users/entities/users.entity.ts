import { Entity, Column, Unique, Index } from 'typeorm';

import { AUTH_PROVIDER } from '../../auth/constants/auth-provider.constant';
import { BaseEntity } from '../../../shared/database/base.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Unique('email', ['email'])
  @Column({ type: 'varchar', name: 'email', length: 255, nullable: true })
  email: string | null;

  @Column({
    type: 'varchar',
    name: 'password',
    length: 255,
    select: true,
    nullable: true,
  })
  password: string;

  @Column({
    type: 'boolean',
    default: false,
    name: 'isVerified',
    nullable: true,
  })
  isVerified: boolean;

  @Column({ type: 'boolean', default: true })
  isAccountDisabled: boolean;

  @Column('simple-array')
  role: string[];

  @Column({
    name: 'provider',
    type: 'varchar',
    length: 255,
    default: AUTH_PROVIDER.EMAIL,
  })
  provider: string;

  @Index()
  @Column({ nullable: true, name: 'social_id', type: 'varchar', length: 255 })
  socialId: string;

  @Index()
  @Column({ nullable: true, name: 'first_name', type: 'varchar', length: 255 })
  firstName: string | null;

  @Index()
  @Column({ nullable: true, name: 'last_name', type: 'varchar', length: 255 })
  lastName: string | null;

  @Index()
  @Column({ type: 'varchar', length: '255', name: 'token', nullable: true })
  token: string;

  @Column({ type: 'varchar', name: 'expire_in', nullable: true })
  expireIn: string;
}
