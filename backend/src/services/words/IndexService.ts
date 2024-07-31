import { Injectable } from '@nestjs/common';
import { WordRepository } from '@/repositories/Word';
import type { Word } from '@/entities/Word';

@Injectable()
export class IndexService {
    constructor(private wordRepository: WordRepository) {}

    async handle(userId: string): Promise<Word[]> {
        return this.wordRepository.repository
            .createQueryBuilder('word')
            .innerJoin('word.users', 'user', 'user.id = :userId', {
                userId
            })
            .getMany();
    }
}
