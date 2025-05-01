import {
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(256)
  name: string;

  @ApiProperty({
    example: 'my-first-blog-post',
    description: 'The slug of the post',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'Slug should all small letters and uses "-" and without spaces. For example: my-url,',
  })
  slug: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(512)
  description?: string;

  @ApiPropertyOptional()
  @IsJSON()
  @IsOptional()
  @MinLength(3)
  @MaxLength(512)
  schema?: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  @MinLength(3)
  @MaxLength(1024)
  featuredImageUrl?: string;
}
