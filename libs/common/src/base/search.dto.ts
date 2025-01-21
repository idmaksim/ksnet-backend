import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested, IsObject, IsOptional } from 'class-validator';
import { PaginationDto } from './pagination.dto';
import { Type } from 'class-transformer';

export class SearchBaseDto<F, S> {
  @ValidateNested()
  @IsObject()
  @IsOptional()
  filters?: F;

  @ApiProperty({ type: PaginationDto })
  @ValidateNested()
  @Type(() => PaginationDto)
  @IsObject()
  @IsOptional()
  pagination?: PaginationDto;

  @IsOptional()
  @ValidateNested()
  @IsObject()
  sorts?: S;
}
