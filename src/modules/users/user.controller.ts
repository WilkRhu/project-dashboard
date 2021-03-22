import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/role.decorator';
import { Role } from '../auth/enuns/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role-auth.guard';
import { UsersService } from './users.service';
@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADM)
  @Get()
  async findAllUser() {
    return await this.userService.findAllUser();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':uuid')
  async findOneById(@Param('uuid') uuid: string) {
    return await this.userService.findOneById(uuid);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':uuid')
  async destroyUser(@Param('uuid') uuid: string) {
    return await this.userService.destroyUser(uuid);
  }
}
