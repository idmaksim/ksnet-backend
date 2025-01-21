import { ApiProperty, OmitType } from '@nestjs/swagger';
import { PostBaseDto } from './post.base.dto';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { SearchBaseDto } from '@app/common/base/search.dto';
import { SortTypes } from '@app/common/constants/sort-types.enum';

export class PostFiltersDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  ownerId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  query?: string;
}

export class PostSortDto {
  @ApiProperty({ enum: SortTypes })
  @IsOptional()
  @IsEnum(SortTypes)
  createdAt?: SortTypes;
}

export class PostSearchDto extends SearchBaseDto<PostFiltersDto, PostSortDto> {
  @ApiProperty({ type: PostFiltersDto })
  @ValidateNested()
  filters?: PostFiltersDto;

  @ApiProperty({ type: PostSortDto })
  @ValidateNested()
  sort?: PostSortDto;
}
