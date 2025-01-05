import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { ActivityType } from '@prisma/client';
import { getWeekDates } from '../../helpers/dates';
import { dayjs } from '../../helpers/dates';

@Injectable()
export class GetWeeklyActivitiesService {
    constructor(private prisma: PrismaService) {}

    async handle(userId: string, date = '') {
        const week = getWeekDates(date),
            startDate = new Date(week[0]),
            endDate = new Date(dayjs(week[6]).add(1, 'd').format('YYYY-MM-DD'));

        const activities = await this.prisma.userActivity.findMany({
            where: {
                userId: userId,
                activity: {
                    in: [ActivityType.login, ActivityType.review]
                },
                activity_time: {
                    gte: new Date(startDate),
                    lte: new Date(endDate)
                }
            },
            orderBy: {
                activity_time: 'asc'
            }
        });

        const activityMap = new Map(
            week.map(day => [day, { signin: false, review: false }])
        );

        activities.forEach(({ activity_time, activity }) => {
            const day = dayjs(activity_time).format('YYYY-MM-DD');

            if (activityMap.has(day)) {
                if (activity === ActivityType.login) {
                    activityMap.get(day).signin = true;
                } else if (activity === ActivityType.review) {
                    activityMap.get(day).review = true;
                }
            }
        });

        return week.map(weekDay => ({ [weekDay]: activityMap.get(weekDay) }));
    }
}
