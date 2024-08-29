import { Module } from '@nestjs/common';
import { CleanExpiredSessionService } from '../services/cron/CleanExpiredSessionService';
import { LuciaModule } from './lucia.module';

@Module({
    imports: [LuciaModule],
    providers: [CleanExpiredSessionService]
})
export class CronModule {}
