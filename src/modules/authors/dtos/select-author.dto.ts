import { IsBoolean, IsOptional } from 'class-validator';
import { SelectDto } from 'src/common/dtos';

export class SelectAuthorDto extends SelectDto {
  @IsOptional()
  @IsBoolean()
  name?: boolean;

  @IsOptional()
  @IsBoolean()
  email?: boolean;

  @IsOptional()
  @IsBoolean()
  ph_no?: boolean;

  @IsOptional()
  @IsBoolean()
  address?: boolean;
}
