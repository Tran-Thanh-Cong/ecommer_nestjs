import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthRefreshTokenInput {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}
