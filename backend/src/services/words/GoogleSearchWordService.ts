import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const translate = require('google-translate-extended-api');

import type { TranslationResponse } from '../../types/general';

@Injectable()
export class GoogleSearchWordService {
    constructor(private prisma: PrismaService) {}

    async handle(searchText: string, userId: string) {
        try {
            let parsedTranslations: string[] = [];

            const userWords = await this.prisma.word.findMany({
                where: {
                    users: { some: { id: userId } }
                }
            });

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

            const translations = parsedTranslations.map(item => {
                const assignedWord = userWords.find(
                    userWord =>
                        (userWord.word === item ||
                            userWord.word === searchText) &&
                        (userWord.translation === item ||
                            userWord.translation === searchText)
                );

                return assignedWord
                    ? {
                          id: assignedWord.id,
                          word: searchText,
                          translation: item,
                          userId
                      }
                    : {
                          word: searchText,
                          translation: item,
                          userId: '',
                          id: ''
                      };
            });

            return translations;
        } catch (error) {
            console.error('Error in GoogleSearchWordService:', error);
            throw error;
        }
    }
}
