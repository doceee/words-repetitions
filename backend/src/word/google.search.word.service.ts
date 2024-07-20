import { Injectable } from '@nestjs/common';
import { WordRepository } from './word.repository';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const translate = require('google-translate-extended-api');

import type { TranslationResponse } from 'src/types/general';

@Injectable()
export class GoogleSearchWordService {
    constructor(private readonly wordRepository: WordRepository) {}

    async handle(searchText: string, userId: string) {
        try {
            let parsedTranslations: string[] = [];

            const userWords = await this.wordRepository.getWords(userId);

            const res: TranslationResponse = await translate(
                searchText,
                'en',
                'pl',
                {
                    examples: false
                }
            );

            for (const property in res.translations) {
                parsedTranslations = [
                    ...parsedTranslations,
                    ...res.translations[property]
                ];
            }

            const translations = [];
            parsedTranslations.map(item => {
                const assignedWordIndex = userWords.findIndex(
                    userWord =>
                        (userWord.word === item ||
                            userWord.word === searchText) &&
                        (userWord.translation === item ||
                            userWord.translation == searchText)
                );

                if (~assignedWordIndex) {
                    translations.push({
                        word: searchText,
                        translation: item,
                        userId,
                        id: userWords[assignedWordIndex].id
                    });
                } else {
                    translations.push({
                        word: searchText,
                        translation: item,
                        userId: '',
                        id: ''
                    });
                }
            });

            return translations;
        } catch (error) {
            console.error(error);

            return [];
        }
    }
}
