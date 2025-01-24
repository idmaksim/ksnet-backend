import { PostBaseDto } from '@app/post/dto/post.base.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class PostCreateDto extends OmitType(PostBaseDto, ['isVerified']) {
  @ApiProperty({ type: [String] })
  @IsUUID('4', { each: true })
  @IsOptional()
  tags?: string[];
}
