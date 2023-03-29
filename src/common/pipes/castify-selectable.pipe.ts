import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { isEmptyObj } from 'src/utils/helpers';

export class CastifySelectablePipe implements PipeTransform {
  transform(select: any, _metadata: ArgumentMetadata) {
    return isEmptyObj(select) ? null : { ...select, id: true };
  }
}
