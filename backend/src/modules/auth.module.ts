import { forwardRef, Module } from '@nestjs/common';

import { AuthController } from '../controllers/auth.controller';
import { LogoutService } from '../services/auth/LogoutService';
import { MeService } from '../services/auth/MeService';
import { LoginService } from '../services/auth/LoginService';
import { RegisterService } from '../services/auth/RegisterService';
import { LoggedUserGuard } from '../middlewares/LoggedUserGuard';
import { PrismaModule } from './prisma.module';
import { LuciaModule } from './lucia.module';
import { UserActivityModule } from './user-activity.module';
import { StoreService } from '../services/user-activities/StoreService';

@Module({
    imports: [PrismaModule, LuciaModule, forwardRef(() => UserActivityModule)],
    controllers: [AuthController],
    providers: [
        LogoutService,
        RegisterService,
        MeService,
        LoginService,
        LoggedUserGuard,
        StoreService
    ],
    exports: [LoggedUserGuard]
})
export class AuthModule {}
