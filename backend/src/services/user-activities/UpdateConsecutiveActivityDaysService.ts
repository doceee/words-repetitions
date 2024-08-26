import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { UserActivity } from '@prisma/client';
import { dayjs } from '../../helpers/dates';

@Injectable()
export class UpdateConsecutiveActivityDaysService {
    constructor(private prisma: PrismaService) {}

    async handle(userId: string) {
        const activities = await this.prisma.$queryRaw<UserActivity[]>`
            SELECT DISTINCT ON (DATE("activity_time")) *
            FROM "UserActivity"
            WHERE "userId" = ${userId} AND "activity" = 'Login'
            ORDER BY DATE("activity_time"), "activity_time" ASC;
        `;

        if (activities.length === 0) {
            return 0;
        }

        const uniqueDays = Array.from(
            new Set(
                activities.map(activity =>
                    dayjs(activity.activity_time).format('YYYY-MM-DD')
                )
            )
        )
            .map(date => dayjs(date))
            .sort((a, b) => a.diff(b));

        let maxConsecutiveDays = 1;
        let currentStreak = 1;

        for (let i = 1; i < uniqueDays.length; i++) {
            const previousDay = uniqueDays[i - 1];
            const currentDay = uniqueDays[i];

            if (currentDay.diff(previousDay, 'day') === 1) {
                currentStreak++;
            } else {
                maxConsecutiveDays = Math.max(
                    maxConsecutiveDays,
                    currentStreak
                );
                currentStreak = 1;
            }
        }

        maxConsecutiveDays = Math.max(maxConsecutiveDays, currentStreak);

        await this.prisma.user.update({
            where: { id: userId },
            data: { consecutiveActivity: maxConsecutiveDays }
        });
    }
}
