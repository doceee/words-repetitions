import { Module } from '@nestjs/common';

import { AuthController } from '../controllers/auth.controller';
import { UserRepository } from '../repositories/User';
import { LogoutService } from '../services/auth/LogoutService';
import { MeService } from '../services/auth/MeService';
import { LoginService } from '../services/auth/LoginService';
import { RegisterService } from '../services/auth/RegisterService';
import { GetLoggedUserService } from '../services/auth/GetLoggedUser';
import { LoggedUserGuard } from '../middlewares/LoggedUserGuard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [
        UserRepository,
        LogoutService,
        RegisterService,
        MeService,
        LoginService,
        GetLoggedUserService,
        LoggedUserGuard
    ],
    exports: [UserRepository, LoggedUserGuard, GetLoggedUserService]
})
export class AuthModule {}
