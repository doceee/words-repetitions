import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LuciaFactory } from 'src/modules/lucia.module';
import { ILucia } from 'src/plugins/lucia';

@Injectable()
export class CleanExpiredSessionService {
    private readonly logger = new Logger(CleanExpiredSessionService.name);

    constructor(@Inject(LuciaFactory) private readonly lucia: ILucia) {}

    @Cron(CronExpression.EVERY_DAY_AT_1AM)
    async handleCron() {
        try {
            await this.lucia.deleteExpiredSessions();

            this.logger.debug('Deleted all expired sessions');
        } catch (error) {
            this.logger.error('Failed to delete expired sessions');
        }
    }
}
