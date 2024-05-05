import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateWordDto, EditWordDto } from './dto';

@Injectable()
export class WordRepository {
    constructor(private readonly prisma: PrismaService) {}

    getWords(userId: string) {
        return this.prisma.word.findMany({
            where: {
                userId
            }
        });
    }

    getWordById(userId: string, wordId: string) {
        return this.prisma.word.findFirst({
            where: {
                id: wordId,
                userId
            }
        });
    }

    async isWordAssigned(
        userId: string,
        word: string,
        translation: string,
        id?: string
    ) {
        const val1 = await this.prisma.word.findFirst({
            where: {
                word,
                translation,
                userId,
                NOT: id ? { id } : {}
            }
        });

        const val2 = await this.prisma.word.findFirst({
            where: {
                word: translation,
                translation: word,
                userId,
                NOT: id ? { id } : {}
            }
        });

        return !!val1 || !!val2;
    }

    async editWordById(userId: string, wordId: string, dto: EditWordDto) {
        const word = await this.prisma.word.findUnique({
            where: {
                userId,
                id: wordId
            }
        });

        if (!word || word.userId !== userId)
            throw new ForbiddenException('Access to resources denied');

        return this.prisma.word.update({
            where: {
                id: wordId
            },
            data: {
                ...dto
            }
        });
    }

    createWord(userId: string, dto: CreateWordDto) {
        return this.prisma.word.create({
            data: {
                userId,
                ...dto
            }
        });
    }

    async deleteWordById(userId: string, wordId: string) {
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
