import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { Match } from '../../../shared/decorator/match.decorator';

export class RegisterInputDto {
  @ApiPropertyOptional({
    description: 'username',
    example: 'tranthanhcong',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'email',
    example: 'tranthanhcongkptm2@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'password',
    example: 'Cong060500',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'confirm_password',
    example: 'Cong060500',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Match('password', { message: 'Password not match' })
  confirm_password: string;
}
