import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { AuthModule } from './auth.module';
import { WordModule } from './word.module';
import { config } from '../config/index';
import { UserModule } from './user.module';

@Module({
    imports: [
        PrismaModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config]
        }),
        AuthModule,
        WordModule,
        UserModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
