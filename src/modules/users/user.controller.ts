import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/role.decorator';
import { Role } from '../auth/enuns/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role-auth.guard';
import { UsersService } from './users.service';
@Controller('user')
export class UserController {
  constructor(private userService: UsersService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADM)
  @Get()
  @ApiBearerAuth('JWT-auth')
  async findAllUser() {
    return await this.userService.findAllUser();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiParam({
    name: 'uuid',
    type: 'string'
  })
  @Get(':uuid')
  async findOneById(@Param('uuid') uuid: string) {
    return await this.userService.findOneById(uuid);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiParam({
    name: 'uuid',
    type: 'string'
  })
  @Delete(':uuid')
  async destroyUser(@Param('uuid') uuid: string) {
    return await this.userService.destroyUser(uuid);
  }
}
