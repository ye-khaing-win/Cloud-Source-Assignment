import {
  createParamDecorator,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

export const GetAuthor = createParamDecorator(
  (prop: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    switch (prop) {
      case 'id':
        return user.id;
      default:
        return user;
    }
  },
);
