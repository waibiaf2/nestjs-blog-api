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
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserParamDto } from './dtos/get-user-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  public getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.userService.getAllUsers(limit, page);
  }

  @Get(':id')
  public getUser(@Param() getUserParamDto: GetUserParamDto) {
    return `User with id: ${getUserParamDto.id}`;
  }

  @Get(':id/:optional')
  public getUserWithOptionalParam(
    @Param('id', ParseIntPipe) id: number | undefined,
    @Param('optional', ParseIntPipe) optional: string,
  ) {
    console.log(id);
    console.log(optional);
    return `User with id: ${id} and ${optional}`;
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
