import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Paginatables } from '../enums';

export const Paginate = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const page = +request.query.page || 1;
    const limit = +request.query.limit || 10;
    const skip = (page - 1) * limit;

    switch (data) {
      case Paginatables.SKIP:
        return skip;
      case Paginatables.TAKE:
        return limit;
      default:
        return { skip, take: limit };
    }
  },
);
