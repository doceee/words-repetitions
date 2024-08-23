import { forwardRef, Module } from '@nestjs/common';

import { PrismaModule } from './prisma.module';
import { StoreService } from '../services/user-activities/StoreService';
import { IndexService } from '../services/user-activities/IndexService';
import { UserActivitiesController } from '../controllers/user-activity.controller';
import { AuthModule } from './auth.module';
import { LoggedUserGuard } from 'src/middlewares/LoggedUserGuard';

@Module({
    imports: [PrismaModule, forwardRef(() => AuthModule)],
    controllers: [UserActivitiesController],
    providers: [StoreService, IndexService, LoggedUserGuard],
    exports: [StoreService]
})
export class UserActivityModule {}
