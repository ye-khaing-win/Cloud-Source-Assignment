import { Transform, Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, ValidateNested } from 'class-validator';

export class NumericQueryOperatorDto {
  @Transform(({ value }: { value: string }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  equals?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => NumericQueryOperatorDto)
  not?: NumericQueryOperatorDto;

  @Transform(({ value }: { value: string }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  gt?: number;

  @Transform(({ value }: { value: string }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  gte?: number;

  @Transform(({ value }: { value: string }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  lt?: number;

  @Transform(({ value }: { value: string }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  lte?: number;

  @Transform(({ value }: { value: string }) =>
    value.split(',').map((v) => parseInt(v)),
  )
  @IsArray()
  @IsOptional()
  in?: number[];
}
