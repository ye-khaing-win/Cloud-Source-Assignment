import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Select = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { query } = request;

    if (!query.select) return null;

    const fields = query.select.split(',').map((field: string) => field.trim());

    const select = fields.reduce((select: any, field: string) => {
      select[field] = true;
      return select;
    }, {});

    return select;
  },
);
