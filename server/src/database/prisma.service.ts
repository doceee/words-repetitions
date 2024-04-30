import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    constructor() {
        super();
    }

    async onModuleInit() {
        let retries = 5;

        while (retries > 0) {
            try {
                await this.$connect();

                break;
            } catch (err) {
                console.error(err);

                retries -= 1;

                await new Promise(res => setTimeout(res, 3_000));
            }
        }
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    cleanDb() {
        return this.$transaction([
            this.word.deleteMany(),
            this.user.deleteMany()
        ]);
    }
}
