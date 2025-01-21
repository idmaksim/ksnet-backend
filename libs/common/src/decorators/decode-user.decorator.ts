import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const DecodeUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user;
  },
);
