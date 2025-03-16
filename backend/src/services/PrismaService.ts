import { PrismaClient } from '@prisma/client';
import {
    Injectable,
    Logger,
    OnModuleDestroy,
    OnModuleInit
} from '@nestjs/common';
@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
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
