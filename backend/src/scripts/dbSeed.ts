import { NestFactory } from '@nestjs/core';
import { Seeder } from '@/services/seeder/seeder';
import { SeederModule } from '@/modules/seeder.module';

async function seed() {
    const app = await NestFactory.createApplicationContext(SeederModule);
    const seeder = app.get(Seeder);

    try {
        await seeder.handle();

        console.debug('Seeding complete!');
    } catch (error) {
        console.error('Seeding failed!');
        console.error(error);
    } finally {
        await app.close();
    }
}

seed();
