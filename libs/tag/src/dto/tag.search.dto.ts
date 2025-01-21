import { TagBaseDto } from './tag.base.dto';
import { IsEnum } from 'class-validator';
import { SearchBaseDto } from '@app/common/base/search.dto';
import { Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { SortTypes } from '@app/common/constants/sort-types.enum';

export class TagFiltersDto extends PartialType(TagBaseDto) {}

export class TagSortDto {
  @ApiProperty({ enum: SortTypes })
  @IsEnum(SortTypes)
  name?: SortTypes;
}

export class TagSearchDto extends SearchBaseDto<TagFiltersDto, TagSortDto> {
  @ApiProperty({ type: TagFiltersDto })
  @Type(() => TagFiltersDto)
  filters?: TagFiltersDto;

  @ApiProperty({ type: TagSortDto })
  @Type(() => TagSortDto)
  sort?: TagSortDto;
}
