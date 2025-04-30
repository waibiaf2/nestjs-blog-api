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
import { GetUserParamsDto } from './dtos/get-user-params.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
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
  public getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.userService.findAll(limit, page);
  }

  // @Get(':id')
  // public getUser(@Param() getUserParamsDto: GetUserParamsDto) {
  //   return this.userService.findOneById(getUserParamsDto.id);
  // }

  @Get(':id/{:optional}')
  public getUserWithOptionalParam(@Param() getUserParamsDto: GetUserParamsDto) {
    const { id, optional } = getUserParamsDto;
    console.log(getUserParamsDto);
    console.log(id);
    if (optional != undefined) {
      console.log(optional);
    }
    return `User with id: ${id} and ${optional ? `${optional}` : ''}`;
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    return `User created the details are: ${JSON.stringify(createUserDto)}`;
  }

  @Patch()
  public updateUser(@Body() patchUserDto: PatchUserDto) {
    return `User updated the details are: ${JSON.stringify(patchUserDto)}`;
  }
}
