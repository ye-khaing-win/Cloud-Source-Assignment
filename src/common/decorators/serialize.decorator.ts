import { UseInterceptors } from '@nestjs/common';
import { Constructable } from '../interfaces';
import { SerializeInterceptor } from '../interceptors';

export function Serialize(dto: Constructable = class {}) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
