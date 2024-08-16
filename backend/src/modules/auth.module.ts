import { Module } from '@nestjs/common';

import { AuthController } from '../controllers/auth.controller';
import { LogoutService } from '../services/auth/LogoutService';
import { MeService } from '../services/auth/MeService';
import { LoginService } from '../services/auth/LoginService';
import { RegisterService } from '../services/auth/RegisterService';
import { GetLoggedUserService } from '../services/auth/GetLoggedUser';
import { LoggedUserGuard } from '../middlewares/LoggedUserGuard';
import { PrismaModule } from './prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [AuthController],
    providers: [
        LogoutService,
        RegisterService,
        MeService,
        LoginService,
        GetLoggedUserService,
        LoggedUserGuard
    ],
    exports: [LoggedUserGuard, GetLoggedUserService]
})
export class AuthModule {}
