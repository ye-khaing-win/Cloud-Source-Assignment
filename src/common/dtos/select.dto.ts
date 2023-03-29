import { IsBoolean, IsOptional } from 'class-validator';

export class SelectDto {
  @IsOptional()
  @IsBoolean()
  id?: boolean;

  @IsOptional()
  @IsBoolean()
  createdAt?: boolean;

  @IsOptional()
  @IsBoolean()
  updatedAt?: boolean;
}
