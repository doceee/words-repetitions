import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class IndexService {
    constructor(private prisma: PrismaService) {}

    async handle(userId: string) {
        return this.prisma.word.findMany({ where: { userId } });
    }
}
