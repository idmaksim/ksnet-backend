import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { LikeService } from '../like.service';
import { User } from '@app/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class CanDeleteGuard implements CanActivate {
  constructor(
    private readonly likeService: LikeService,
    private readonly i18n: I18nService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;
    const like = await this.likeService.findOneById(id);
    const user = request.user;

    if (like.userId != (user as User).id) {
      throw new ForbiddenException(this.i18n.t('errors.like.forbidden'));
    }

    return true;
  }
}
