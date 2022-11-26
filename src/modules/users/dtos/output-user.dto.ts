import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class OutputUserDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  username: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  isVerified: boolean;

  @Expose()
  @ApiProperty()
  created_at: string;

  @Expose()
  @ApiProperty()
  updated_at: string;
}
