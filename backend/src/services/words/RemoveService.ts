import { Injectable } from '@nestjs/common';

import { WordRepository } from '@/repositories/Word';
import { UserRepository } from '@/repositories/User';

@Injectable()
export class RemoveService {
    constructor(
        private readonly wordRepository: WordRepository,
        private readonly userRepository: UserRepository
    ) {}

    async handle(wordId: string, userId: string) {
        const word = await this.wordRepository.findById(wordId);

        if (!word) {
            return;
        }

        const user = await this.userRepository.findById(userId, {
            relations: { words: true }
        });

        Object.assign(user, {
            words: user.words.filter(item => item.id !== wordId)
        });

        await this.userRepository.repository.save(user);
    }
}
