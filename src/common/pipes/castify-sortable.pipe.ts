import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class CastifySortablePipe implements PipeTransform {
  transform(sort: string[], _metadata: ArgumentMetadata) {
    return Object.keys(sort).map((criterion) => ({
      [criterion]: sort[criterion],
    }));
  }
}
