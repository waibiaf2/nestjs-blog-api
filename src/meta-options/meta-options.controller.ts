import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMetaOptionsDto } from './dtos/create-meta-options.dto';
import { MetaOptionsService } from './providers/meta-options.service';
import { Auth } from '../auth/decorator/auth.decorator';
import { AuthType } from '../auth/enums/auth-type.enums';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(private readonly metaOptionsService: MetaOptionsService) {}

  @Get()
  @Auth(AuthType.None)
  public getMetaOptions() {
    return this.metaOptionsService.findAll();
  }

  @Post()
  @Auth(AuthType.Bearer)
  public createMetaOption(@Body() createMetaOptionDto: CreateMetaOptionsDto) {
    return this.metaOptionsService.create(createMetaOptionDto);
  }
}
