import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { FilterDto } from 'src/common/dtos';

export class FilterBookDto extends FilterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isPublished?: boolean;

  @IsOptional()
  @IsString()
  authorId?: string;
}
