import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { Match } from '../../../shared/decorator/match-password.decorator';

export class AuthRegisterInputDto {
  @ApiProperty({
    example: 'tranthanhcongkptm2@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    example: 'Cong060500',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'Cong060500',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Match('password', { message: 'Password not match' })
  confirm_password: string;
}
