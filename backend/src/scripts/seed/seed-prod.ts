import { PrismaClient } from '@prisma/client';
import { seedWords } from './seed/seedWords';

export const seedDb = async (prisma: PrismaClient) => {
    console.log('Seed script started');

    try {
        await seedWords(prisma);
    } catch (error) {
        console.error(error);
    }

    console.log('Seed script finished');
};
