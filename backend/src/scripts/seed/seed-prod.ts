import { PrismaClient } from '@prisma/client';
import { seedWords } from './seed/seedWords';

const prisma = new PrismaClient();

export const seedDb = async () => {
    console.log('Seed script started');

    try {
        await seedWords(prisma);
    } catch (error) {
        console.error(error);
    }

    console.log('Seed script finished');
};
