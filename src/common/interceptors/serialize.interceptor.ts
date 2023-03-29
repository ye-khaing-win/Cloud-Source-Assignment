import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isEmptyObj } from 'src/utils/helpers';
import { Statuses } from '../enums/statuses.enum';
import { Constructable } from '../interfaces';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: Constructable) {}
  intercept(_ctx: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response: any) => {
        const result = response instanceof Array ? response.length : undefined;
        const token = response?.token;
        const message = response?.message;
        const data = plainToInstance(this.dto, response, {
          excludeExtraneousValues: true,
        });

        return {
          status: Statuses.SUCCESS,
          token,
          message,
          result,
          data,
        };
      }),
    );
  }
}
