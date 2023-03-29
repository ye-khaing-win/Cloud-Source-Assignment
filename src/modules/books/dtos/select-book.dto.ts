import { IsBoolean, IsOptional } from 'class-validator';
import { SelectDto } from 'src/common/dtos';

export class SelectBookDto extends SelectDto {
  @IsOptional()
  @IsBoolean()
  name?: boolean;

  @IsOptional()
  @IsBoolean()
  description?: boolean;

  @IsOptional()
  @IsBoolean()
  content?: boolean;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @IsOptional()
  @IsBoolean()
  authorId?: boolean;

  @IsOptional()
  @IsBoolean()
  author?: boolean;
}
