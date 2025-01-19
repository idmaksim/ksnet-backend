import { PostBaseDto } from '@app/post/dto/post.base.dto';
import { InputType } from '@nestjs/graphql';

@InputType()
export class PostCreateDto extends PostBaseDto {}
