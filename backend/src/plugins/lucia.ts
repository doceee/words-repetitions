import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/services/PrismaService';
import {
    loadLuciaModule,
    loadPrismaAdapterModule
} from '../helpers/modules-load';

export async function useLucia(prisma: PrismaService, config: ConfigService) {
    const { Lucia, TimeSpan } = await loadLuciaModule();
    const { PrismaAdapter } = await loadPrismaAdapterModule();

    const adapter = new PrismaAdapter<PrismaService>(
        prisma.session,
        prisma.user
    );

    return new Lucia(adapter, {
        sessionExpiresIn: new TimeSpan(3, 'h'),
        sessionCookie: {
            name: 'token',
            attributes: {
                secure:
                    config.get('app.isProd') &&
                    config.get('app.appUrl').startsWith('https')
            }
        }
    });
}

declare module 'lucia' {
    interface Register {
        Lucia: Awaited<ReturnType<typeof useLucia>>;
    }
}

export type ILucia = Awaited<ReturnType<typeof useLucia>>;
