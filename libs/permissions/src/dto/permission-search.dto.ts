import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PermissionBaseDto } from './permission-base.dto';
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { SearchBaseDto } from '@app/common/base/search.dto';
import { SortTypes } from '@app/common/constants/sort-types.enum';

export class PermissionSortDto {
  @ApiProperty({ enum: SortTypes })
  @IsOptional()
  @IsString()
  title?: SortTypes;
}

export class PermissionFiltersDto extends PartialType(PermissionBaseDto) {}

export class PermissionSearchDto extends SearchBaseDto<
  PermissionFiltersDto,
  PermissionSortDto
> {
  @ApiProperty()
  @Type(() => PermissionFiltersDto)
  filters?: PermissionFiltersDto;

  @ApiProperty()
  @Type(() => PermissionSortDto)
  sorts?: PermissionSortDto;
}
