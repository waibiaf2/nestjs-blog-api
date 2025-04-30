import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostsMetaOptionsDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  value: any;
}
