import { IsBoolean, IsOptional } from 'class-validator';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostBaseDto {
  @ApiProperty({ type: String, nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: String })
  @IsString()
  content: string;

  @ApiProperty({ type: String })
  @IsString()
  title: string;

  @ApiProperty({ type: String })
  @IsString()
  url: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;
}
