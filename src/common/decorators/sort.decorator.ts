import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Sort = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.query.sort) {
      return {};
    }

    const params: string[] = request.query.sort
      .split(',')
      .map((param: string) => param.trim());

    return params.reduce((sort, param) => {
      if (param.startsWith('-')) {
        sort[param.substring(1)] = 'desc';
      } else {
        sort[param] = 'asc';
      }

      return sort;
    }, {});
  },
);
