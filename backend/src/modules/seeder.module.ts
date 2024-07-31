import { Module } from '@nestjs/common';

import { Seeder } from '@/services/seeder/seeder';
import { DatabaseModule } from './database.module';
import { AuthModule } from './auth.module';
import { WordModule } from './word.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [DatabaseModule, ConfigModule, AuthModule, WordModule],
    providers: [Seeder]
})
export class SeederModule {}
