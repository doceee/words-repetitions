import { PrismaClient } from '@prisma/client';
import { easyWords, advancedWords, intermediateWords } from './data';
import { wordLists as wordListsData } from '../../src/config/constants';

export const seedWords = async (prisma: PrismaClient, userIds: string[]) => {
    const connectedUsers = userIds.map(item => ({ id: item }));

    await prisma.wordList.createMany({
        data: [...wordListsData]
    });

    const wordLists = await prisma.wordList.findMany({ select: { id: true } });

    await prisma.word.createMany({
        data: [...easyWords, ...intermediateWords, ...advancedWords],
        skipDuplicates: true
    });

    const words = await prisma.word.findMany({
        take: 10, // assign 10 words to user
        select: { id: true }
    });

    const wordListUpdates = [
        prisma.wordList.update({
            where: { id: wordLists[0].id },
            data: { words: { connect: words.slice(0, 5) } }
        }),
        prisma.wordList.update({
            where: { id: wordLists[1].id },
            data: { words: { connect: words.slice(5, 10) } }
        })
    ];

    await prisma.$transaction(wordListUpdates);

    const wordUpdates = words.map(word =>
        prisma.word.update({
            where: { id: word.id },
            data: { users: { connect: connectedUsers } }
        })
    );

    await prisma.$transaction(wordUpdates);
};
