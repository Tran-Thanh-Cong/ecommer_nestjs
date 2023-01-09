import { Entity, Column, Unique, Index } from 'typeorm';

import { AUTH_PROVIDER } from '../../auth/constants/auth-provider.constant';
import { BaseEntity } from '../../../shared/database/base.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Unique('email', ['email'])
  @Column({ type: 'varchar', name: 'email', length: 255 })
  email: string;

  @Column({ type: 'varchar', name: 'password', length: 255, select: true })
  password: string;

  @Column({ type: 'boolean', default: false })
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
  @Column({ type: 'varchar', length: '255', name: 'token' })
  token: string;

  @Column({ type: 'varchar', name: 'expireIn' })
  expireIn: string;
}
