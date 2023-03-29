import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { FilterDto } from 'src/common/dtos';

export class FilterAuthorDto extends FilterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
