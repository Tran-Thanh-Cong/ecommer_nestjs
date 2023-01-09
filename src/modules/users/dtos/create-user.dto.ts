import { ROLE } from './../../auth/constants/role.constant';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  Length,
  IsArray,
  ArrayNotEmpty,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'tranthanhcongktpm2@gmail.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Cong060500' })
  @IsString()
  @IsNotEmpty()
  @Length(8, 255)
  password: string;

  @ApiProperty({ example: ROLE.USER })
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(ROLE, { each: true })
  role: ROLE[];

  @ApiProperty({ example: false })
  @IsBoolean()
  isAccountDisabled: boolean;
}
