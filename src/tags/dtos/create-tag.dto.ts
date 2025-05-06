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
  @ApiProperty({
    example: 'Web Development',
    description: 'Posts about web development',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(256)
  name: string;

  @ApiProperty({
    example: 'web-development',
    description: 'The slug of the tag',
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

  @ApiPropertyOptional({
    example: 'This tag is used for web development posts',
    description: 'A short description of the tag',
  })
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

  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg',
    description: 'The URL of the featured image for the tag',
  })
  @IsUrl()
  @IsOptional()
  @MinLength(3)
  @MaxLength(1024)
  featuredImageUrl?: string;
}
