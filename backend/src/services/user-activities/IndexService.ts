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

        const transformedActivities = week.map(item => {
            const signin = activities.some(
                activity =>
                    activity.activity === ActivityType.Login &&
                    dayjs(activity.activity_time).isSame(item, 'day')
            );
            const review = activities.some(
                activity =>
                    activity.activity === ActivityType.Review &&
                    dayjs(activity.activity_time).isSame(item, 'day')
            );

            return { [item]: { signin, review } };
        });

        return transformedActivities;
    }
}
