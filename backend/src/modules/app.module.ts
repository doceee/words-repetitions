import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { AuthModule } from './auth.module';
import { WordModule } from './word.module';
import { config } from '../config/index';
import { LuciaModule } from './lucia.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config]
        }),
        PrismaModule,
        LuciaModule,
        AuthModule,
        WordModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
