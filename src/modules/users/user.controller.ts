import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guards';
import { UsersService } from './users.service';

@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async allUser() {
    return 'Hellow Word!';
  }
}
