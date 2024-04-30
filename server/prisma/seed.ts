import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const seedDb = async () => {
    console.log('Seed script started');

    await prisma.word.deleteMany();
    await prisma.user.deleteMany();

    const password = 'test1234';
    const assignedWords = 10;

    const hash = await argon.hash(password);
    const user = await prisma.user.create({
        data: { hash, email: 'user@gmail.com' }
    });
    const user2 = await prisma.user.create({
        data: { hash, email: 'user2@gmail.com' }
    });
    await prisma.user.create({
        data: { hash, email: 'admin@admin.com.test' }
    });
    const promise = [user, user2].map(async item => {
        for (let i = 0; i < assignedWords; i++) {
            const word = faker.lorem.word({
                length: { min: 4, max: 10 },
                strategy: 'longest'
            });
            const translation = faker.lorem.word({
                length: { min: 4, max: 10 },
                strategy: 'longest'
            });

            await prisma.word.create({
                data: { word, translation, userId: item.id }
            });
        }
    });

    await Promise.all(promise);

    console.log('Seed script finished');
};

seedDb();
