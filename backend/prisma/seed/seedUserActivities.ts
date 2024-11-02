import { PrismaClient, ActivityType, UserActivity } from '@prisma/client';
import * as dayjs from 'dayjs';

export const seedUserActivities = async (
    prisma: PrismaClient,
    userIds: string[]
) => {
    const promise = userIds.map(async userId => {
        const count = Math.floor(Math.random() * (30 - 20 + 1)) + 20; //random integer between 20 and 30 (inclusive)
        let reviewsCount = 0;

        const seedData: Omit<UserActivity, 'id'>[] = [];
        for (let i = 0; i <= count; i++) {
            const shouldAddLoginActivity = Math.random() < 0.7;
            let date = dayjs().subtract(i, 'd').format();

            if (shouldAddLoginActivity) {
                seedData.push({
                    userId: userId,
                    activity: ActivityType.login,
                    activity_time: new Date(date)
                });

                if (Math.random() < 0.6) {
                    reviewsCount++;
                    seedData.push({
                        userId: userId,
                        activity: ActivityType.review,
                        activity_time: new Date(date)
                    });
                }
            }
        }

        await prisma.userActivity.createMany({
            data: seedData
        });

        const userWordsCount = await prisma.word.count({
            where: { users: { some: { id: userId } } }
        });

        await prisma.user.update({
            where: { id: userId },
            data: {
                reviewedWords: userWordsCount * reviewsCount,
                reviewsDone: reviewsCount
            }
        });
    });

    await Promise.all(promise);
};
