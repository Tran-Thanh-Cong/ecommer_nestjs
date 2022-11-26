import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { Match } from '../../../shared/decorator/match.decorator';

export class Register {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Match('password', { message: '{Password not match' })
  confirm_password: string;
}
