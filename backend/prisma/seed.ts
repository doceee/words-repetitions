import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const seedDb = async () => {
    console.log('Seed script started');

    try {
        const password = 'test1234';
        const hash = bcrypt.hashSync(password, 12);
        const words = [
            { word: 'add', translation: 'dodawać' },
            { word: 'work', translation: 'praca' },
            { word: 'word', translation: 'słowo' },
            { word: 'way', translation: 'droga' },
            { word: 'world', translation: 'świat' }
        ];

        const user = await prisma.user.create({
            data: { hash, email: 'user@gmail.com' }
        });
        const user2 = await prisma.user.create({
            data: { hash, email: 'user2@gmail.com' }
        });

        for (let i = 0; i < words.length; i++) {
            const wordItem = await prisma.word.create({
                data: {
                    word: words[i].word,
                    translation: words[i].translation
                }
            });
            await prisma.word.update({
                where: {
                    id: wordItem.id
                },
                data: {
                    users: {
                        connect: [{ id: user.id }, { id: user2.id }]
                    }
                }
            });
        }
    } catch (error) {
        console.error(error);
    }

    console.log('Seed script finished');
};

seedDb();
