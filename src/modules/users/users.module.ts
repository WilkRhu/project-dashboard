import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { USER_REPOSITORY } from '../../core/constants';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role-auth.guard';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UserController } from './user.controller';
import { usersProviders } from './user.providers';
import { UsersService } from './users.service';

@Module({
  providers: [
    UsersService,
    JwtAuthGuard,
    JwtStrategy,
    ...usersProviders,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [UsersService, USER_REPOSITORY],
  controllers: [UserController],
})
export class UsersModule {}
