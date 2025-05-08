import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({
    summary: 'Fetches a list of users on the application',
    description: 'Get all users with pagination',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of users',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'The number of entries returned per query',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'The page number to return',
    example: 1,
  })
  @Get()
  public getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.userService.findAll(limit, page);
  }

  @Get(':id')
  public getUserWithOptionalParam(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneById(id);
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post()
  public createManyUsers(@Body() createUserDto: CreateUserDto[]) {
    return this.userService.createMany(createUserDto);
  }

  @Patch()
  public updateUser(@Body() patchUserDto: PatchUserDto) {
    return `User updated the details are: ${JSON.stringify(patchUserDto)}`;
  }
}
