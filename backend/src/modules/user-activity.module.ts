import { forwardRef, Module } from '@nestjs/common';
import { StoreService } from '../services/user-activities/StoreService';
import { GetWeeklyActivitiesService } from '../services/user-activities/GetWeeklyActivitiesService';
import { UserActivitiesController } from '../controllers/user-activity.controller';
import { AuthModule } from './auth.module';
import { LoggedUserGuard } from 'src/middlewares/LoggedUserGuard';
import { UpdateConsecutiveActivityDaysService } from '../services/user-activities/UpdateConsecutiveActivityDaysService';

@Module({
    imports: [forwardRef(() => AuthModule)],
    controllers: [UserActivitiesController],
    providers: [
        StoreService,
        GetWeeklyActivitiesService,
        LoggedUserGuard,
        UpdateConsecutiveActivityDaysService
    ],
    exports: [StoreService]
})
export class UserActivityModule {}
