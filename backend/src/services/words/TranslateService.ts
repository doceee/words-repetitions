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
            const userWords = await this.prisma.word.findMany({
                where: {
                    users: { some: { id: userId } },
                    OR: [{ word: searchText }, { translation: searchText }]
                }
            });

            const { data } = await axios.post<TranslationResponse>(
                `${translateApiUrl}`,
                {
                    q: `${searchText}`,
                    source: 'en',
                    target: 'pl',
                    format: 'text',
                    alternatives: 10
                }
            );

            if (!data || !data.translatedText) {
                throw new Error('Translation failed, no data returned.');
            }

            const translations = [
                data.translatedText,
                ...data.alternatives
            ].map(item => {
                const assignedWord = userWords.find(
                    userWord =>
                        (userWord.word === item ||
                            userWord.word === searchText) &&
                        (userWord.translation === item ||
                            userWord.translation === searchText)
                );

                return {
                    id: assignedWord ? assignedWord.id : '',
                    word: searchText,
                    translation: item,
                    userId: assignedWord ? userId : ''
                };
            });

            return translations;
        } catch (error) {
            console.error('Error in Translation Service:', error);
            throw error;
        }
    }
}
