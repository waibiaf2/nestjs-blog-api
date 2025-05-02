import { IsJSON, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateMetaOptionsDto {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Meta value in JSON format',
    example: '{"key": "value"}',
  })
  @ApiProperty()
  @IsNotEmpty()
  @IsJSON()
  metavalue: string;
}
