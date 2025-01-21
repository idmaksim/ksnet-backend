import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class ActiveGuard implements CanActivate {
  constructor(private readonly i18n: I18nService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!user.isActive) {
      throw new ForbiddenException(this.i18n.t('errors.user.deactivated'));
    }
    return true;
  }
}
