import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RegisterOutputDto {
  @Expose()
  @ApiProperty({
    description: 'id',
    example: 1,
  })
  id: number;

  @Expose()
  @ApiPropertyOptional({
    description: 'username',
    example: 'tranthanhcong',
  })
  username: string;

  @Expose()
  @ApiProperty({
    description: 'email',
    example: 'tranthanhcongktpm2@gmail.com',
  })
  email: string;

  @Expose()
  @ApiProperty({
    description: 'isVerified',
    example: false,
  })
  isVerified: boolean;

  @Expose()
  @ApiProperty({
    description: 'created_at',
    example: Date.now(),
  })
  created_at: string;

  @Expose()
  @ApiProperty({
    description: 'updated_at',
    example: Date.now(),
  })
  updated_at: string;
}
