import { Module, OnModuleDestroy } from '@nestjs/common';
import { InjectDataSource, TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env${
                process.env.NODE_ENV === 'test' ? '.test' : ''
            }`,
            load: [config],
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                ...configService.get('database'),
                autoLoadEntities: true
            })
        })
    ]
})
export class DatabaseModule implements OnModuleDestroy {
    constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

    async onModuleDestroy() {
        this.dataSource.isInitialized ?? (await this.dataSource.destroy());
    }
}
