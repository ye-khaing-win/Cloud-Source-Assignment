import { IsOptional, IsEnum } from 'class-validator';
import { SortDto } from 'src/common/dtos';
import { SortOrders } from 'src/common/enums';

export class SortAuthorDto extends SortDto {
  @IsOptional()
  @IsEnum(SortOrders)
  name?: SortOrders;

  @IsOptional()
  @IsEnum(SortOrders)
  email?: SortOrders;
}
