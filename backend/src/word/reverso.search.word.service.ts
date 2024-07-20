import { Injectable } from '@nestjs/common';
import { WordRepository } from './word.repository';
import { promisify } from 'util';
import cheerio from 'cheerio';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require('request');

@Injectable()
export class ReversoSearchWordService {
    constructor(private readonly wordRepository: WordRepository) {}

    async handle(searchText: string, userId: string) {
        try {
            const userWords = await this.wordRepository.getWords(userId);
            const _request = promisify(request);
            const url = `https://www.diki.pl/slownik-angielskiego?q=${searchText}`;
            const { body } = await _request({ url });
            const $ = cheerio.load(body);

            const parsedTranslations = new Set<string>();
            $('.foreignToNativeMeanings')
                .find('.hw .plainLink')
                .each((i, el) => {
                    const item = $(el).text().toLowerCase();
                    parsedTranslations.add(item);
                });

            const translations = Array.from(parsedTranslations).map(item => {
                const assignedWord = userWords.find(
                    userWord =>
                        (userWord.word === item ||
                            userWord.word === searchText) &&
                        (userWord.translation === item ||
                            userWord.translation === searchText)
                );

                if (assignedWord) {
                    return {
                        word: searchText,
                        translation: item,
                        userId,
                        id: assignedWord.id
                    };
                } else {
                    return {
                        word: searchText,
                        translation: item,
                        userId: '',
                        id: ''
                    };
                }
            });

            return translations;
        } catch (error) {
            console.error(error);

            return [];
        }
    }
}
