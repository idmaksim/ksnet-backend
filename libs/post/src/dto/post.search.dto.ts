import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { PostBaseDto } from './post.base.dto';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { SearchBaseDto } from '@app/common/base/search.dto';
import { SortTypes } from '@app/common/constants/sort-types.enum';
import { Type } from 'class-transformer';

export class PostFiltersDto extends PartialType(PostBaseDto) {
  @ApiProperty()
  @IsString()
  @IsOptional()
  ownerId?: string;

  @ApiProperty({ type: [String] })
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

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
  @Type(() => PostFiltersDto)
  filters?: PostFiltersDto;

  @ApiProperty({ type: PostSortDto })
  @ValidateNested()
  @Type(() => PostSortDto)
  sort?: PostSortDto;
}
