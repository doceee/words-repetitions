import { seedDb as seedProd } from './seed-prod';
import { seedDb as seedDev } from './seed-dev';

const main = async () => {
    const mode = process.env.SEED_MODE;
    console.log(`Seed mode: ${mode}`);

    if (mode === 'dev') {
        await seedDev();
    } else if (mode === 'prod') {
        await seedProd();
    } else {
        await seedDev();

        console.warn('Invalid seed mode. Dev script started...');
    }
};

main().catch(e => {
    console.error(e);
    process.exit(1);
});
