import { PrismaClient } from '@prisma/client';

export const seedWords = async (prisma: PrismaClient, userIds: string[]) => {
    const words = [
        { word: 'add', translation: 'dodawać' },
        { word: 'work', translation: 'praca' },
        { word: 'word', translation: 'słowo' },
        { word: 'way', translation: 'droga' },
        { word: 'world', translation: 'świat' }
    ];
    const connectedUsers = userIds.map(item => ({ id: item }));

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
                    connect: connectedUsers
                }
            }
        });
    }
};
