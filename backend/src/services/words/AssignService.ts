import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEditDto } from '../../dto/word/CreateEdit.dto';
import { PrismaService } from '../PrismaService';
import { WordListType } from '../../config/constants';

@Injectable()
export class AssignService {
    constructor(private prisma: PrismaService) {}

    async handle(data: CreateEditDto, userId: string, wordId = '') {
        const isAssigned = await this.isAlreadyAssigned(data, userId);

        if (isAssigned) {
            throw new BadRequestException({
                param: 'word',
                msg: 'Słówko jest już na liście'
            });
        }

        const wordItem = await this.findOrCreate(data);
        const wordList = await this.prisma.wordList.findFirst({
            where: {
                name: `${WordListType.current}`
            }
        });

        if (!wordList) {
            throw new BadRequestException({
                param: 'wordList',
                msg: 'Lista nie znaleziona'
            });
        }

        if (!wordItem) {
            throw new BadRequestException({
                param: 'word',
                msg: 'Słówko nie znalezione'
            });
        }

        await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                words: {
                    connect: { id: wordItem.id },
                    ...(wordId && { disconnect: { id: wordId } })
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

    async findOrCreate({ word, translation }: CreateEditDto) {
        const existingWord = await this.prisma.word.findFirst({
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

        if (existingWord) return existingWord;

        return this.prisma.word.create({
            data: { word, translation }
        });
    }

    async isAlreadyAssigned(
        { word, translation }: CreateEditDto,
        userId: string
    ) {
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
