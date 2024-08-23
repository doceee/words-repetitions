import { PrismaClient, User, ActivityType } from '@prisma/client';
import * as dayjs from 'dayjs';

export const seedUserActivities = async (prisma: PrismaClient, user: User) => {
    const count = Math.floor(Math.random() * (30 - 20 + 1)) + 20;

    const seedData = [];

    for (let i = 0; i <= count; i++) {
        const shouldAddLoginActivity = Math.random() < 0.7;
        let date = dayjs().subtract(i, 'd').format();

        if (shouldAddLoginActivity) {
            seedData.push({
                userId: user.id,
                activity: ActivityType.Login,
                activity_time: date
            });

            if (Math.random() < 0.3) {
                seedData.push({
                    userId: user.id,
                    activity: ActivityType.Review,
                    activity_time: date
                });
            }
        }
    }

    await prisma.userActivity.createMany({
        data: seedData
    });
};
