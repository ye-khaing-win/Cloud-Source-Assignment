import { IsOptional } from 'class-validator';
import { Containable } from 'src/common/dtos';

export class SearchBookDto {
  @IsOptional()
  name?: Containable;

  @IsOptional()
  description?: Containable;

  @IsOptional()
  content?: Containable;
}
