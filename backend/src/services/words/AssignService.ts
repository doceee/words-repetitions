import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEditDto } from '../../dto/word/CreateEdit.dto';
import { PrismaService } from '../PrismaService';
import { WordListType } from '../../config/constants';

@Injectable()
export class AssignService {
    constructor(private prisma: PrismaService) {}

    async handle(data: CreateEditDto, userId: string, wordId = '') {
        const assignedWord = await this.isAlreadyAssigned(data, userId);

        if (assignedWord) {
            throw new BadRequestException({
                param: 'word',
                msg: 'Słówko jest już na liście'
            });
        }

        const [wordItem, wordList] = await Promise.all([
            this.findOrCreate(data),
            this.prisma.wordList.findFirst({
                where: {
                    name: `${WordListType.current}`
                }
            })
        ]);

        await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                words: {
                    connect: { id: wordItem.id },
                    disconnect: { id: wordId }
                }
            }
        });
        await this.prisma.wordList.update({
            where: {
                id: wordList.id
            },
            data: {
                words: {
                    connect: wordItem
                }
            }
        });

        return wordItem;
    }

    async findOrCreate(data: CreateEditDto) {
        const { word, translation } = data;

        const isCreated = await this.prisma.word.findFirst({
            where: {
                OR: [
                    {
                        word,
                        translation
                    },
                    {
                        translation: word,
                        word: translation
                    }
                ]
            }
        });

        if (isCreated) return isCreated;

        return this.prisma.word.create({
            data
        });
    }

    async isAlreadyAssigned(data: CreateEditDto, userId: string) {
        const { word, translation } = data;

        const existingWord = await this.prisma.word.findFirst({
            where: {
                OR: [
                    { word, translation },
                    { translation: word, word: translation }
                ],
                users: {
                    some: {
                        id: userId
                    }
                }
            }
        });

        return existingWord !== null;
    }
}
