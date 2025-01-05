import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';

@Injectable()
export class IndexService {
    constructor(private prisma: PrismaService) {}

    handle() {
        return this.prisma.wordList.findMany();
    }
}
