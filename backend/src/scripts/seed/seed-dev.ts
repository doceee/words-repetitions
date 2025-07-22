import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { seedUserActivities } from './seed/seedUserActivities';
import { seedWords } from './seed/seedWords';

export const seedDb = async (prisma: PrismaClient) => {
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

        const words = await seedWords(prisma);

        const wordUpdates = words.map(word =>
            prisma.word.update({
                where: { id: word.id },
                data: { users: { connect: [user, user2] } }
            })
        );

        await prisma.$transaction(wordUpdates);

        await seedUserActivities(prisma, [user.id, user2.id]);
    } catch (error) {
        console.error(error);
    }

    console.log('Seed script finished');
};
