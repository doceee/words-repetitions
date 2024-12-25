import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../PrismaService';

import type { TranslationResponse } from '../../types/general';

@Injectable()
export class TranslateService {
    constructor(
        private prisma: PrismaService,
        private configService: ConfigService
    ) {}

    async handle(searchText: string, userId: string) {
        const translateApiUrl =
            (this.configService.get<string>('translateApp.url') ||
                'http://localhost:5000') + '/translate';

        try {
            let parsedTranslations: string[] = [];

            const userWords = await this.prisma.word.findMany({
                where: {
                    users: { some: { id: userId } }
                }
            });

            const { data } = await axios.post<TranslationResponse>(
                `${translateApiUrl}`,
                {
                    q: `${searchText}`,
                    source: 'auto',
                    target: 'pl',
                    format: 'text',
                    alternatives: 10
                }
            );

            if (data.detectedLanguage.confidence < 45) {
                return [];
            }

            parsedTranslations = [data.translatedText, ...data.alternatives];

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
            console.error('Error in Translation Service:', error);
            throw error;
        }
    }
}
