import { IsDate, IsOptional } from 'class-validator';

export class FilterDto {
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
