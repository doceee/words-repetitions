import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';

@Injectable()
export class GetUserWordsService {
    constructor(private prisma: PrismaService) {}

    handle(userId: string, listName: string) {
        return this.prisma.word.findMany({
            where: {
                users: {
                    some: { id: userId }
                },
                wordList: { name: listName }
            }
        });
    }
}
