import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty, IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { PostType } from '../enums/post-type.enum';
import { PostStatus } from '../enums/post-status.enum';
import { CreatePostsMetaOptionsDto } from './create-posts-meta-options.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    example: 'My first post',
    description: 'The title of the post',
  })
  @IsString()
  @MinLength(5)
  title: string;

  @ApiProperty({
    enum: PostType,
    description: 'Possible values {post, page,story,series}',
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType;

  @ApiProperty({
    example: 'my-first-blog-post',
    description: 'The slug of the post',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'Slug should all small letters and uses "-" and without spaces. For example: my-url,',
  })
  slug: string;

  @ApiProperty({
    enum: PostStatus,
    description: 'Possible values {draft, published, archived}',
  })
  @IsEnum(PostStatus)
  @IsNotEmpty()
  status: PostStatus;

  @ApiPropertyOptional({
    example: 'This is the content of my first post',
    description: 'The content of the post',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    example:
      '{"version":1,"blocks":[{"type":"header","data":{"text":"Article Header","level":1}},{"type":"paragraph","data":{"text":"Article content paragraph"}}]}',
    description: 'The excerpt of the post',
  })
  @IsString()
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg',
    description: 'The URL of the featured image',
  })
  @IsUrl()
  @IsOptional()
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: 'The date the post was published',
    example: '2020-01-01T00:00:00.000Z',
  })
  @IsISO8601()
  @IsOptional()
  publishedOn?: Date;

  @ApiPropertyOptional({
    description: 'Post categories',
    example: ['nestjs', 'devOps'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags?: string[];

  @ApiPropertyOptional({
    type: 'array',
    required: false,
    items: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description:
            'The key can be any string identifier for your meta data.',
          example: 'sideBarEnabled',
        },
        value: {
          type: 'any',
          description: 'Any value you want to save.',
          example: true,
        },
      },
    },
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostsMetaOptionsDto)
  metaOptions?: CreatePostsMetaOptionsDto[];
}
