import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type, Exclude } from 'class-transformer';
import { IsArray, IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';

import { ROLE } from './../constants/role.constant';

export class AuthRegisterOutputDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @Exclude()
  @ApiProperty()
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
  provider: string;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  isAccountDisabled: boolean;

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
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @ApiProperty()
  @Type(() => Date)
  updatedAt: Date;
}
