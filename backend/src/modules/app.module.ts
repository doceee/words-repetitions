import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { AuthModule } from './auth.module';
import { WordModule } from './word.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule, DatabaseModule, AuthModule, WordModule],
    controllers: [],
    providers: []
})
export class AppModule {}
