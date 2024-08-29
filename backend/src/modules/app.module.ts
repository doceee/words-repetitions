import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { AuthModule } from './auth.module';
import { WordModule } from './word.module';
import { config } from '../config/index';
import { LuciaModule } from './lucia.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './cron.module';
import { UserModule } from './user.module';

@Module({
    imports: [
        PrismaModule,
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config]
        }),
        LuciaModule,
        AuthModule,
        WordModule,
        UserModule,
        CronModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
