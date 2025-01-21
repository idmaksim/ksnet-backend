import { GroupBaseDto } from './group.base.dto';
import { IsEnum } from 'class-validator';
import { SortTypes } from '@app/common/constants/sort-types.enum';
import { SearchBaseDto } from '@app/common/base/search.dto';
import { Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class GroupFiltersDto extends PartialType(GroupBaseDto) {}

export class GroupSortDto {
  @ApiProperty({ enum: SortTypes })
  @IsEnum(SortTypes)
  name: SortTypes;
}

export class GroupSearchDto extends SearchBaseDto<
  GroupFiltersDto,
  GroupSortDto
> {
  @ApiProperty({ type: GroupFiltersDto })
  @Type(() => GroupFiltersDto)
  filters?: GroupFiltersDto;

  @ApiProperty({ type: GroupSortDto })
  @Type(() => GroupSortDto)
  sort?: GroupSortDto;
}
