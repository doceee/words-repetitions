import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateEditDto } from '../../dto/word/CreateEdit.dto';
import { PrismaService } from '../PrismaService';

@Injectable()
export class EditService {
    constructor(private prisma: PrismaService) {}

    async handle(data: CreateEditDto, wordId: string, userId: string) {
        const associatedWord = await this.prisma.word.findUnique({
            where: {
                userId,
                id: wordId
            }
        });

        if (!associatedWord) {
            throw new BadRequestException({
                param: 'word',
                msg: 'Słówko jest już na liście'
            });
        }

        return this.prisma.word.update({
            where: {
                id: wordId
            },
            data: {
                ...data
            }
        });
    }
}
