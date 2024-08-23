import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { ActivityType } from '@prisma/client';
import { getWeekDates } from '../../helpers/dates';
import * as dayjs from 'dayjs';

@Injectable()
export class IndexService {
    constructor(private prisma: PrismaService) {}

    async handle(userId: string, date = '') {
        const week = getWeekDates(date || new Date().toISOString());

        const activities = await this.prisma.userActivity.findMany({
            where: {
                userId,
                OR: [
                    {
                        activity: ActivityType.Login
                    },
                    {
                        activity: ActivityType.Review
                    }
                ],
                activity_time: {
                    gte: dayjs(week[0]).format(),
                    lt: dayjs(week[6]).format()
                }
            }
        });

        const transformedActivities = week.map(weekDay => {
            const filteredActivities = activities.filter(activity =>
                dayjs(activity.activity_time).isSame(dayjs(weekDay), 'd')
            );

            const signin = filteredActivities.some(
                ({ activity }) => activity === ActivityType.Login
            );
            const review = filteredActivities.some(
                ({ activity }) => activity === ActivityType.Review
            );

            return { [weekDay]: { signin, review } };
        });

        return transformedActivities;
    }
}
