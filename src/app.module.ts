import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { AvatarUserController } from './modules/avatar-user/avatar-user.controller';
import { UsersModule } from './modules/users/users.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    NotificationModule
  ],
  controllers: [AvatarUserController],
  providers: [],
})
export class AppModule {}
