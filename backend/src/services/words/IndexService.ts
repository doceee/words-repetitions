import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';

@Injectable()
export class IndexService {
    constructor(private prisma: PrismaService) {}

    async handle(userId: string) {
        return this.prisma.word.findMany({ where: { userId } });
    }
}
