import { PrismaClient } from '@prisma/client';
import {
    easyWords,
    advancedWords,
    intermediateWords,
    words as wordList
} from './seed';

export const seedWords = async (prisma: PrismaClient, userIds: string[]) => {
    const connectedUsers = userIds.map(item => ({ id: item }));

    await prisma.word.createMany({
        data: [
            ...wordList,
            ...easyWords,
            ...intermediateWords,
            ...advancedWords
        ],
        skipDuplicates: true
    });

    const words = await prisma.word.findMany({
        take: 10, // assign 10 words to user
        select: { id: true }
    });

    for (let i = 0; i < words.length; i++) {
        await prisma.word.update({
            where: {
                id: words[i].id
            },
            data: {
                users: {
                    connect: connectedUsers
                }
            }
        });
    }
};
