import { IsOptional, IsEnum } from 'class-validator';
import { SortOrders } from '../enums';

export class SortDto {
  @IsOptional()
  @IsEnum(SortOrders)
  createdAt?: SortOrders;

  @IsOptional()
  @IsEnum(SortOrders)
  updatedAt?: SortOrders;
}
