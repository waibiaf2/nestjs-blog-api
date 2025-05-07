import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMetaOptionsDto } from './dtos/create-meta-options.dto';
import { MetaOptionsService } from './providers/meta-options.service';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(private readonly metaOptionsService: MetaOptionsService) {}

  @Get()
  public getMetaOptions() {
    return this.metaOptionsService.findAll();
  }

  @Post()
  public createMetaOption(@Body() createMetaOptionDto: CreateMetaOptionsDto) {
    return this.metaOptionsService.create(createMetaOptionDto);
  }
}
