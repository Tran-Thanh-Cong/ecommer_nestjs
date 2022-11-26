import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;
}
