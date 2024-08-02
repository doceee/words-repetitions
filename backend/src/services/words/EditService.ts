import { BadRequestException, Injectable } from '@nestjs/common';

import { AssignService } from './AssignService';
import { WordRepository } from '../../repositories/Word';
import { CreateEditDto } from '../../dto/word/CreateEdit.dto';

import type { Word } from '../../entities/Word';
import type { User } from '../../entities/User';

@Injectable()
export class EditService {
    constructor(
        private wordRepository: WordRepository,
        private assignService: AssignService
    ) {}

    async handle(data: CreateEditDto, user: User): Promise<Word> {
        const { word, translation } = data;

        const associatedWord = await this.wordRepository.repository
            .createQueryBuilder('word')
            .innerJoin('word.users', 'user', 'user.id = :userId', {
                userId: user.id
            })
            .where('word.word = :word', { word })
            .andWhere('word.translation = :translation', {
                translation
            })
            .orWhere('word.translation = :word', { word })
            .andWhere('word.word = :translation', {
                translation
            })
            .getOne();

        if (associatedWord) {
            throw new BadRequestException({
                param: 'word',
                msg: 'Słówko jest już na liście'
            });
        }

        return this.assignService.handle(data, user);
    }
}
