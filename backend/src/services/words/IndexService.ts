import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';

@Injectable()
export class IndexService {
    constructor(private prisma: PrismaService) {}

    async handle(limit: number | string, level = '') {
        const wordLlimit =
            typeof limit === 'string' ? parseInt(limit, 10) : limit;

        return this.prisma.word.findMany({
            take: wordLlimit || 10,
            where: level ? { level } : {}
        });
    }
}
