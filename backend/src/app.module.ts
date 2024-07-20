import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WordModule } from './word/word.module';
import { PrismaModule } from './prisma/prisma.module';
import config from './config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config]
        }),
        AuthModule,
        UserModule,
        WordModule,
        PrismaModule
    ]
})
export class AppModule {}
