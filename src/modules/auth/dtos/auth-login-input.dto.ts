import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthLoginInputDto {
  @ApiProperty({
    example: 'tranthanhcongktpm2@gmail.com',
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
  @Length(8, 255)
  password: string;
}
