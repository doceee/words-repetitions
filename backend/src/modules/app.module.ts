import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { AuthModule } from './auth.module';
import { WordModule } from './word.module';
import { config } from '../config/index';
import { UserModule } from './user.module';
import { WordListModule } from './word-list.module';
import { DefaultModule } from './default.module';

@Module({
    imports: [
        PrismaModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config]
        }),
        AuthModule,
        WordModule,
        UserModule,
        WordListModule,
        DefaultModule
    ]
})
export class AppModule {}
