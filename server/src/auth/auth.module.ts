import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';
import { LoggedInGuard } from './guard';

@Module({
  imports: [UserModule],
  providers: [AuthService, UserRepository, LoggedInGuard],
  controllers: [AuthController],
})
export class AuthModule {}
