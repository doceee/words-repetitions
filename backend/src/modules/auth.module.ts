import { forwardRef, Module } from '@nestjs/common';

import { AuthController } from '../controllers/auth.controller';
import { LogoutService } from '../services/auth/LogoutService';
import { MeService } from '../services/auth/MeService';
import { LoginService } from '../services/auth/LoginService';
import { RegisterService } from '../services/auth/RegisterService';
import { LoggedUserGuard } from '../middlewares/LoggedUserGuard';
import { UserActivityModule } from './user-activity.module';
import { StoreService } from '../services/user-activities/StoreService';
import { UpdateConsecutiveActivityDaysService } from '../services/user-activities/UpdateConsecutiveActivityDaysService';

@Module({
    imports: [forwardRef(() => UserActivityModule)],
    controllers: [AuthController],
    providers: [
        LogoutService,
        RegisterService,
        MeService,
        LoginService,
        LoggedUserGuard,
        StoreService,
        UpdateConsecutiveActivityDaysService
    ],
    exports: [LoggedUserGuard]
})
export class AuthModule {}
