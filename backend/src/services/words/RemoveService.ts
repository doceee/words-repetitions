import { Injectable } from '@nestjs/common';

import { PrismaService } from '../PrismaService';

@Injectable()
export class RemoveService {
    constructor(private prisma: PrismaService) {}

    async handle(wordId: string, userId: string) {
        await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                words: {
                    disconnect: { id: wordId }
                }
            }
        });
    }
}
