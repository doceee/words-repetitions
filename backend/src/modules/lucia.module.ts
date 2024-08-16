import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { ConfigService } from '@nestjs/config';
import { useLucia } from '../plugins/lucia';

export const LuciaFactory = 'Lucia';

@Global()
@Module({
    providers: [
        {
            provide: LuciaFactory,
            inject: [PrismaService, ConfigService],
            useFactory: useLucia
        }
    ],
    exports: [LuciaFactory]
})
export class LuciaModule {}
