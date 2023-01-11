import { AUTH_PROVIDER } from '../../auth/constants/auth-provider.constant';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';

import { ROLE } from './../../auth/constants/role.constant';

export class OutputUserDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @Exclude()
  @IsString()
  password: string;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  isVerified: boolean;

  @Expose()
  @ApiProperty()
  @IsArray()
  @IsEnum(ROLE)
  role: ROLE[];

  @Expose()
  @ApiProperty()
  @IsString()
  @IsEnum(AUTH_PROVIDER)
  provider: AUTH_PROVIDER;

  @Expose()
  @ApiProperty()
  @IsString()
  token: string;

  @Expose()
  @ApiProperty()
  @IsString()
  expireIn: string;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  isAccountDisabled: boolean;

  @Expose()
  @ApiProperty()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @ApiProperty()
  @Type(() => Date)
  updatedAt: Date;
}
