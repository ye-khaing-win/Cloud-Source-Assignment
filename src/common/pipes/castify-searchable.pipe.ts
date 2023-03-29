import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { isEmptyObj } from 'src/utils/helpers';

export class CastifySearchablePipe implements PipeTransform {
  transform(search: string[], _metadata: ArgumentMetadata) {
    return isEmptyObj(search)
      ? search
      : {
          OR: Object.keys(search).map((criterion) => ({
            [criterion]: search[criterion],
          })),
        };
  }
}
