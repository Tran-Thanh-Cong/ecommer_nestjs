import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class GoogleLoginOutputDto {
  @Expose()
  @Expose()
  @ApiProperty()
  @IsString()
  access_token: string;

  @Expose()
  @ApiProperty()
  @IsString()
  refresh_token: string;
}
