import { Field, InputType, PartialType } from '@nestjs/graphql';
import { GroupBaseDto } from './group.base.dto';
import { IsEnum, IsObject, IsOptional, ValidateNested } from 'class-validator';
import { SortTypes } from '@app/common/constants/sort-types.enum';
import { SearchBaseDto } from '@app/common/base/search.dto';
import { Type } from 'class-transformer';

@InputType()
export class GroupFiltersDto extends PartialType(GroupBaseDto) {}

@InputType()
export class GroupSortDto {
  @Field(() => SortTypes)
  @IsEnum(SortTypes)
  name: SortTypes;
}

@InputType()
export class GroupSearchDto extends SearchBaseDto {
  @Field(() => GroupFiltersDto, { nullable: true })
  @ValidateNested()
  @Type(() => GroupFiltersDto)
  @IsObject()
  @IsOptional()
  filters?: GroupFiltersDto;

  @Field(() => GroupSortDto, { nullable: true })
  @ValidateNested()
  @Type(() => GroupSortDto)
  @IsObject()
  @IsOptional()
  sort?: GroupSortDto;
}
