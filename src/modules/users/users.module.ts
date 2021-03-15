import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { usersProviders } from './user.providers';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}
