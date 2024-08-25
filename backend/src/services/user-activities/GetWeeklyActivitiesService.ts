import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { ActivityType } from '@prisma/client';
import { getWeekDates } from '../../helpers/dates';
import * as dayjs from 'dayjs';

@Injectable()
export class GetWeeklyActivitiesService {
    constructor(private prisma: PrismaService) {}

    async handle(userId: string, date = '') {
        const week = getWeekDates(date || new Date().toISOString());
        const startDate = new Date(week[0]),
            endDate = new Date(dayjs(week[6]).add(1, 'd').format('YYYY-MM-DD'));

        const activities = await this.prisma.userActivity.findMany({
            where: {
                userId: userId,
                activity: {
                    in: [ActivityType.Login, ActivityType.Review]
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

        return week.map(weekDay => {
            return {
                [weekDay]: {
                    signin: activities.some(
                        ({ activity_time, activity }) =>
                            dayjs(activity_time).isSame(dayjs(weekDay), 'd') &&
                            activity === ActivityType.Login
                    ),
                    review: activities.some(
                        ({ activity_time, activity }) =>
                            dayjs(activity_time).isSame(dayjs(weekDay), 'd') &&
                            activity === ActivityType.Review
                    )
                }
            };
        });
    }
}
