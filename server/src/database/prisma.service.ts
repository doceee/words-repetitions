import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
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
    await this.$connect();
  }

  cleanDb() {
    return this.$transaction([this.word.deleteMany(), this.user.deleteMany()]);
  }
}
