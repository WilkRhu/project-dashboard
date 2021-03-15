import { Controller, Get, UseGuards } from '@nestjs/common';
import { RouleAuthGuard } from '../auth/guards/role-auth.guard';
import { UsersService } from './users.service';
@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(RouleAuthGuard)
  async allUser() {
    return 'Hellow Word!';
  }
}
