import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { QueryParams } from '../enums';

export const Filter = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const queryObj = { ...request.query };

    Object.values(QueryParams).forEach((param) => delete queryObj[param]);

    return queryObj;
  },
);
