import { PrismaClient, User, ActivityType, UserActivity } from '@prisma/client';
import * as dayjs from 'dayjs';
import { words } from './seedData';

export const seedUserActivities = async (prisma: PrismaClient, user: User) => {
    const count = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
    let reviewsCount = 0;

    const seedData: Omit<UserActivity, 'id'>[] = [];
    for (let i = 0; i <= count; i++) {
        const shouldAddLoginActivity = Math.random() < 0.7;
        let date = dayjs().subtract(i, 'd').format();

        if (shouldAddLoginActivity) {
            seedData.push({
                userId: user.id,
                activity: ActivityType.Login,
                activity_time: new Date(date)
            });

            if (Math.random() < 0.6) {
                reviewsCount++;
                seedData.push({
                    userId: user.id,
                    activity: ActivityType.Review,
                    activity_time: new Date(date)
                });
            }
        }
    }

    await prisma.userActivity.createMany({
        data: seedData
    });
    await prisma.user.update({
        where: { id: user.id },
        data: {
            reviewedWords: words.length * reviewsCount,
            reviewsDone: reviewsCount
        }
    });
};
