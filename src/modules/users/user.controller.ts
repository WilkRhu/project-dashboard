import { Controller, Get, UseGuards } from '@nestjs/common';
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
  async allUser() {
    return 'Hellow Word!';
  }
}
