import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit?: number = 1;

  @IsOptional()
  @IsPositive()
  page?: number = 10;
}
