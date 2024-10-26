import { PrismaClient } from '@prisma/client';

import * as bcrypt from 'bcryptjs';
import { seedUserActivities } from './seed/seedUserActivities';
import { seedWords } from './seed/seedWords';

const prisma = new PrismaClient();

const seedDb = async () => {
    console.log('Seed script started');

    try {
        const password = 'test1234';
        const hash = bcrypt.hashSync(password, 12);

        const user = await prisma.user.create({
            data: { hash, email: 'user@gmail.com' }
        });
        const user2 = await prisma.user.create({
            data: { hash, email: 'user2@gmail.com' }
        });

        await seedWords(prisma, [user.id, user2.id]);

        await seedUserActivities(prisma, [user.id, user2.id]);
    } catch (error) {
        console.error(error);
    }

    console.log('Seed script finished');
};

seedDb();
