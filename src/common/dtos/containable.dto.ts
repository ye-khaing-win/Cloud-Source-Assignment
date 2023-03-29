import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class Containable {
  @IsNotEmpty()
  @IsString()
  contains: string;
}
