import { IsOptional } from 'class-validator';
import { Containable } from 'src/common/dtos';

export class SearchAuthorDto {
  @IsOptional()
  name?: Containable;

  @IsOptional()
  email?: Containable;
}
