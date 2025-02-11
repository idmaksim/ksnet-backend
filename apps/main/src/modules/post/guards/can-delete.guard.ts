import { User } from '@app/common';
import { BaseRoleEnum } from '@app/common/constants/base-roles.enum';
import { PostService } from '@app/post';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class CanDeleteGuard implements CanActivate {
  constructor(
    private readonly service: PostService,
    private readonly i18n: I18nService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const id = request.params.id;

    const posts = await this.service.findManyByUserId(user.id);
    if (user.role.name !== BaseRoleEnum.Admin) {
      if (!posts.map((post) => post.id).includes(id)) {
        throw new ForbiddenException(this.i18n.t('errors.post.forbidden'));
      }
    }

    return true;
  }
}
