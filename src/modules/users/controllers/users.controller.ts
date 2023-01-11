import {
  Controller,
  Post,
  Get,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Param,
  HttpCode,
  Patch,
  HttpStatus,
  Delete,
  UseGuards,
  Body,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ROLE } from './../../auth/constants/role.constant';
import { Roles } from './../../../shared/decorator/role.decorator';
import { RolesGuard } from './../../auth/guards/roles.guard';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { OutputUserDto } from './../dtos/output-user.dto';
import { User } from '../entities/users.entity';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from './../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('User')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create user api',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'create user sussessfully',
    type: OutputUserDto,
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @Roles(ROLE.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateUserDto): Promise<User> {
    return this.usersService.createUser(data);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'get all user pagination',
    type: [OutputUserDto],
  })
  @ApiOperation({
    summary: 'Get all use pagination',
  })
  @Roles(ROLE.ADMIN, ROLE.USER)
  @HttpCode(HttpStatus.OK)
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(1), ParseIntPipe) limit: number,
  ): Promise<{ data: User[]; hasNextPage: boolean }> {
    return this.usersService.findAllUser(page, limit);
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'find user by id',
    type: OutputUserDto,
  })
  @ApiOperation({
    summary: 'Find user by id',
  })
  @Roles(ROLE.ADMIN, ROLE.USER)
  @HttpCode(HttpStatus.OK)
  findOneUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOneUser({ id: id });
  }

  @Patch(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'update user by id',
    type: OutputUserDto,
  })
  @ApiOperation({
    summary: 'Update user by id',
  })
  @Roles(ROLE.ADMIN)
  @HttpCode(HttpStatus.OK)
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ) {
    await this.usersService.updateUser(id, data);

    return {
      statusCode: HttpStatus.OK,
      message: 'Update user successfully',
    };
  }

  @Delete(':id')
  @Roles(ROLE.ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'delete user by id',
  })
  @ApiOperation({
    summary: 'Delete user by id',
  })
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.deleteUser(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Delete user successfully',
    };
  }
}
