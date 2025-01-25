import { IsOptional, ValidateNested } from 'class-validator';

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { UserBaseDto } from './user-base.dto';
import { SortTypes } from '@app/common/constants/sort-types.enum';
import { IsEnum, isEnum } from 'class-validator';
import { SearchBaseDto } from '@app/common/base/search.dto';

export class UserFiltersDto extends PartialType(
  OmitType(UserBaseDto, ['password']),
) {}

export class UserSortDto {
  @ApiProperty({ enum: SortTypes })
  @IsEnum(SortTypes)
  @IsOptional()
  firstName?: SortTypes;

  @ApiProperty({ enum: SortTypes })
  @IsEnum(SortTypes)
  @IsOptional()
  lastName?: SortTypes;

  @ApiProperty({ enum: SortTypes })
  @IsEnum(SortTypes)
  @IsOptional()
  email?: SortTypes;
}

export class UserSearchDto extends SearchBaseDto<UserFiltersDto, UserSortDto> {
  @ApiProperty({ type: UserFiltersDto })
  @IsOptional()
  @ValidateNested()
  filters?: UserFiltersDto;

  @ApiProperty({ type: UserSortDto })
  @IsOptional()
  @ValidateNested()
  sort?: UserSortDto;
}
