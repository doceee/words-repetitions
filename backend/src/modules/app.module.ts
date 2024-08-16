import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { AuthModule } from './auth.module';
import { WordModule } from './word.module';
import { ConfigModule } from '@nestjs/config';
import { config } from '../config/index';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config]
        }),
        PrismaModule,
        AuthModule,
        WordModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
