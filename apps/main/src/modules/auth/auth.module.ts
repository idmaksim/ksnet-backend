import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PasswordService } from '@app/password';
import { UsersModule } from '@app/users';
import { TokenModule } from '@app/token';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PasswordService],
  imports: [forwardRef(() => UsersModule), TokenModule],
  exports: [AuthService],
})
export class AuthModule {}
