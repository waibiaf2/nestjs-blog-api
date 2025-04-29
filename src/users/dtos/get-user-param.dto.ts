import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUserParamDto {
  @ApiPropertyOptional({
    description: 'Get user with a specific id',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;

  @ApiPropertyOptional({
    description: 'Get user with an optional parameter',
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  optional?: string;
}
