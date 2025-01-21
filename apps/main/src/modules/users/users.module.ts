import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersModule as LibUserModule } from '@app/users';
@Module({
  imports: [LibUserModule],
  controllers: [UsersController],
})
export class UsersModule {}
