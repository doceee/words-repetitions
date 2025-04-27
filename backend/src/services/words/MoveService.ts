import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { MoveDto } from '../../dto/word/Move.dto';

@Injectable()
export class MoveService {
    constructor(private prisma: PrismaService) {}

    async handle(dto: MoveDto, userId: string) {
        const words = await this.prisma.word.findMany({
            where: {
                id: { in: dto.wordIds },
                users: { some: { id: userId } }
            }
        });

        if (words.length !== dto.wordIds.length) {
            throw new BadRequestException({
                param: 'wordIds',
                msg: 'Nieprawidwa wartość'
            });
        }

        const wordList = await this.prisma.wordList.findUnique({
            where: { name: dto.wordList }
        });

        if (!wordList) {
            throw new BadRequestException({
                param: 'wordList',
                msg: 'Nieprawidwa wartość'
            });
        }

        await this.prisma.wordList.update({
            where: {
                id: wordList.id
            },
            data: {
                words: {
                    connect: words
                }
            }
        });
    }
}
