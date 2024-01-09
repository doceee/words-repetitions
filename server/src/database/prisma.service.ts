import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(readonly configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get('databaseUrl'),
        },
      },
    });
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

        await new Promise((res) => setTimeout(res, 3_000)); // wait for three seconds
      }
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  cleanDb() {
    return this.$transaction([this.word.deleteMany(), this.user.deleteMany()]);
  }
}
