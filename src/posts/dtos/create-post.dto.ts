import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
} from 'class-validator';
import { PostType } from '../enums/post-type.enum';
import { PostStatus } from '../enums/post-status.enum';

export class CreatePostDto {
  @IsString()
  @MinLength(5)
  title: string;

  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'Slug should all small letters and uses "-" and without spaces. For example: my-url,',
  })
  slug: string;

  @IsEnum(PostStatus)
  @IsNotEmpty()
  status: PostStatus;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsJSON()
  @IsOptional()
  schema?: string;

  @IsOptional()
  @IsUrl()
  featuredImageUrl?: string;

  @IsISO8601()
  @IsOptional()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  publishedOn?: Date;

  @IsOptional()
  @IsArray()
  tags?: string[];
  metaOptions: [{ key: string; value: string }];
}
