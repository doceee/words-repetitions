import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from '../controllers/user.controller';
import { AuthModule } from './auth.module';
import { UpdateStatsService } from '../services/users/UpdateStatsService';
import { LoggedUserGuard } from '../middlewares/LoggedUserGuard';

@Module({
    imports: [forwardRef(() => AuthModule)],
    controllers: [UsersController],
    providers: [UpdateStatsService, LoggedUserGuard],
    exports: [UpdateStatsService]
})
export class UserModule {}
