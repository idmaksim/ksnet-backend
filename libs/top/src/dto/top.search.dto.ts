import { ApiProperty, PartialType } from '@nestjs/swagger';
import { TopBaseDto } from './top.base.dto';
import { SortTypes } from '@app/common/constants/sort-types.enum';
import { IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { SearchBaseDto } from '@app/common/base/search.dto';
import { Type } from 'class-transformer';

export class TopFiltersDto extends PartialType(TopBaseDto) {}

export class TopSortsDto {
  @ApiProperty({ enum: SortTypes })
  @IsEnum(SortTypes)
  @IsOptional()
  place?: SortTypes;
}

export class TopSearchDto extends SearchBaseDto<TopFiltersDto, TopSortsDto> {
  @ApiProperty({ type: TopFiltersDto })
  @ValidateNested()
  @Type(() => TopFiltersDto)
  filters: TopFiltersDto;

  @ApiProperty({ type: TopSortsDto })
  @ValidateNested()
  @Type(() => TopSortsDto)
  sorts: TopSortsDto;
}
