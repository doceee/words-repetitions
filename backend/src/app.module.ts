import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WordModule } from './word/word.module';
import { PrismaModule } from './database/prisma.module';
import { RedisClientModule } from './redis/redis-client.module';

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
        PrismaModule,
        RedisClientModule
    ]
})
export class AppModule {}
