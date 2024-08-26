import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { ActivityType } from '@prisma/client';
import { CreateDto } from '../../dto/user-activity/Create.dto';
import { dayjs } from '../../helpers/dates';

@Injectable()
export class StoreService {
    constructor(private prisma: PrismaService) {}

    handle(dto: CreateDto, userId: string) {
        const { activity } = dto;
        const type: ActivityType = ActivityType[activity];

        if (!type) {
            throw new BadRequestException({
                param: 'activity',
                msg: 'Nieprawidłowy typ'
            });
        }

        return this.prisma.userActivity.create({
            data: {
                userId,
                activity: type,
                activity_time: dayjs().format()
            }
        });
    }
}
