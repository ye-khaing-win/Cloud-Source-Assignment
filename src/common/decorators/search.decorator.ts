import { createParamDecorator } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common/interfaces';

export const Search = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.query.search) return {};

    const keywords = Object.values(request.query.search)[0];
    const fields = Object.keys(request.query.search)[0]
      .split(',')
      .map((field) => field.trim());

    return fields.reduce((search, field) => {
      search[field] = { contains: keywords, mode: 'insensitive' };

      return search;
    }, {});
  },
);
