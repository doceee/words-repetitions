import { PrismaClient } from '@prisma/client';
import {
    Injectable,
    Logger,
    OnModuleDestroy,
    OnModuleInit
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    constructor(readonly configService: ConfigService) {
        super({
            errorFormat: configService.get<boolean>('app.isProduction')
                ? 'minimal'
                : 'pretty'
            // log: ['query', 'info', 'warn', 'error']
        });
    }

    private readonly logger = new Logger(PrismaService.name);

    async onModuleInit() {
        await this.$connect();

        this.logger.log('Prisma Client connected');
    }

    async onModuleDestroy() {
        await this.$disconnect();

        this.logger.log('Prisma Client disconnected');
    }
}
