import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

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

        const words = [
            { word: 'add', translation: 'dodawać' },
            { word: 'work', translation: 'praca' },
            { word: 'word', translation: 'słowo' },
            { word: 'way', translation: 'droga' },
            { word: 'world', translation: 'świat' }
        ];

        const promise = [user, user2].map(async item => {
            for (let i = 0; i < words.length; i++) {
                await prisma.word.create({
                    data: {
                        word: words[i].word,
                        translation: words[i].translation,
                        userId: item.id
                    }
                });
            }
        });

        await Promise.all(promise);
    } catch (error) {
        console.error(error);
    }

    console.log('Seed script finished');
};

seedDb();
