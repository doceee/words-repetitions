import { Injectable } from '@nestjs/common';
import { WordRepository } from './word.repository';
import { promisify } from 'util';
import cheerio from 'cheerio';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require('request');

@Injectable()
export class WordService {
    constructor(private readonly wordRepository: WordRepository) {}

    async searchWord(searchText: string, userId: string) {
        try {
            const userWords = await this.wordRepository.getWords(userId);
            const _request = promisify(request);
            const parsedTranslations: string[] = [];
            const url = `https://www.diki.pl/slownik-angielskiego?q=${searchText}`;
            const { body } = await _request({ url });
            const $ = cheerio.load(body);

            $('.foreignToNativeMeanings')
                .find('.hw .plainLink')
                .each((i, el) => {
                    const item = $(el).text().toLocaleLowerCase();

                    if (!parsedTranslations.includes(item)) {
                        parsedTranslations.push(item);
                    }
                });

            const translations = [];
            [...new Set(parsedTranslations)].map(item => {
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
            throw error;
        }
    }
}
