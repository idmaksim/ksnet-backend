import { Field, InputType, PartialType } from '@nestjs/graphql';
import { TagBaseDto } from './tag.base.dto';
import { IsObject, IsOptional, ValidateNested } from 'class-validator';
import { SortTypes } from '@app/common/constants/sort-types.enum';
import { IsEnum } from 'class-validator';
import { SearchBaseDto } from '@app/common/base/search.dto';
import { Type } from 'class-transformer';

@InputType()
export class TagFiltersDto extends PartialType(TagBaseDto) {}

@InputType()
export class TagSortDto {
  @IsOptional()
  @IsEnum(SortTypes)
  @Field(() => SortTypes, { nullable: true })
  name?: SortTypes;
}

@InputType()
export class TagSearchDto extends SearchBaseDto {
  @Field(() => TagFiltersDto, { nullable: true })
  @ValidateNested()
  @Type(() => TagFiltersDto)
  @IsObject()
  @IsOptional()
  filters?: TagFiltersDto;

  @Field(() => TagSortDto, { nullable: true })
  @ValidateNested()
  @Type(() => TagSortDto)
  @IsObject()
  @IsOptional()
  sort?: TagSortDto;
}
