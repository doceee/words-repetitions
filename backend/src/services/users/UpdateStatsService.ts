import { BadRequestException, Injectable } from '@nestjs/common';
import { PatchStatsDto } from '../../dto/user/PatchStats.dto';
import { PrismaService } from '../PrismaService';

@Injectable()
export class UpdateStatsService {
    constructor(private prisma: PrismaService) {}

    async handle(userId: string, { prop, value }: PatchStatsDto) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId }
        });

        if (!(prop in user) || typeof user[prop] !== typeof value) {
            throw new BadRequestException({
                param: 'activity',
                msg: 'Nieprawidłowy typ.'
            });
        }

        return this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                [prop]: { increment: value }
            }
        });
    }
}
