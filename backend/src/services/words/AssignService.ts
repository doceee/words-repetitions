import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateEditDto } from '../../dto/word/CreateEdit.dto';
import { PrismaService } from '../PrismaService';

@Injectable()
export class AssignService {
    constructor(private prisma: PrismaService) {}

    async handle(data: CreateEditDto, userId: string) {
        const { word, translation } = data;

        const associatedWord = await this.prisma.word.findFirst({
            where: {
                userId,
                word,
                translation
            }
        });

        if (associatedWord) {
            throw new BadRequestException({
                param: 'word',
                msg: 'Słówko jest już na liście'
            });
        }

        return this.prisma.word.create({
            data: {
                userId,
                ...data
            }
        });
    }
}
