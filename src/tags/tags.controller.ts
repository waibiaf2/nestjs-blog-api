import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TagsService } from './providers/tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Auth } from '../auth/decorator/auth.decorator';
import { AuthType } from '../auth/enums/auth-type.enums';

@Controller('tags')
export class TagsController {
  constructor(
    /**
     * Inject TagsService
     * */
    private readonly tagsService: TagsService,
  ) {}

  @ApiOperation({
    summary: 'Create a new tag',
    description: 'Creates a new tag in the database',
  })
  @ApiResponse({
    status: 201,
    description: 'Tag created successfully',
  })
  @Post()
  @Auth(AuthType.Bearer)
  public create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @ApiOperation({
    summary: 'Fetches a list of tags',
    description: 'Get all tags with pagination',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of tags',
  })
  @Get()
  @Auth(AuthType.None)
  public findAll() {
    return this.tagsService.findAll();
  }

  @Delete(':id')
  public async deleteTag(@Param('id', ParseIntPipe) id: number) {
    return await this.tagsService.delete(id);
  }

  @Delete(':id/soft-delete')
  public async softDeleteTag(@Param('id', ParseIntPipe) id: number) {
    return await this.tagsService.softRemove(id);
  }
}
