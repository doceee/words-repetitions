import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

@Injectable()
export class RemoveService {
    constructor(private prisma: PrismaService) {}

    async handle(wordId: string, userId: string) {
        const word = await this.prisma.word.findUnique({
            where: {
                userId,
                id: wordId
            }
        });

        if (word) {
            await this.prisma.word.delete({
                where: {
                    id: wordId
                }
            });
        }
    }
}
