import { seedDb as seedProd } from './seed-prod';
import { seedDb as seedDev } from './seed-dev';
import { PrismaClient } from '@prisma/client';

const main = async () => {
    const mode = process.env.SEED_MODE;
    console.log(`Seed mode: ${mode}`);

    const prisma = new PrismaClient();

    // Check if the database already has data (example: check wordList table)
    const existing = await prisma.wordList.findFirst();
    if (existing) {
        console.info('Seed already applied, skipping.');
        process.exit(0);
    }

    if (mode === 'dev') {
        await seedDev(prisma);
    } else if (mode === 'prod') {
        await seedProd(prisma);
    } else {
        await seedDev(prisma);

        console.warn('Invalid seed mode. Dev script started...');
    }
};

main().catch(e => {
    console.error(e);
    process.exit(1);
});
