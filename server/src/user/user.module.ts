import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { LoggedInGuard } from '../auth/guard';
@Module({
  controllers: [UserController],
  providers: [UserRepository, LoggedInGuard],
})
export class UserModule {}
