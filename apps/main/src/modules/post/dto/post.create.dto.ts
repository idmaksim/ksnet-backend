import { PostBaseDto } from '@app/post/dto/post.base.dto';
import { OmitType } from '@nestjs/swagger';

export class PostCreateDto extends OmitType(PostBaseDto, ['isVerified']) {}
