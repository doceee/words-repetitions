import { Module } from '@nestjs/common';

import { AuthController } from '../controllers/auth.controller';
import { LogoutService } from '../services/auth/LogoutService';
import { MeService } from '../services/auth/MeService';
import { LoginService } from '../services/auth/LoginService';
import { RegisterService } from '../services/auth/RegisterService';
import { LoggedUserGuard } from '../middlewares/LoggedUserGuard';
import { PrismaModule } from './prisma.module';
import { LuciaModule } from './lucia.module';

@Module({
    imports: [PrismaModule, LuciaModule],
    controllers: [AuthController],
    providers: [
        LogoutService,
        RegisterService,
        MeService,
        LoginService,
        LoggedUserGuard
    ],
    exports: [LoggedUserGuard]
})
export class AuthModule {}
