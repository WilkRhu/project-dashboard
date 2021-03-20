import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../auth/guards/role-auth.guard';
import { UserController } from './user.controller';
import { usersProviders } from './user.providers';
import { UsersService } from './users.service';

@Module({
  providers: [
    UsersService,
    ...usersProviders,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}
