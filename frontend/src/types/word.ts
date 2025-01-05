export enum WordListType {
    current = 'current',
    learned = 'learned'
}

export interface IWordList {
    id: string;
    name: string;
    label: string;
}

export interface IWord {
    id: string;
    word: string;
    translation: string;
    level: string | null;
    userId: string;
}

export interface IWordState {
    words: IWord[];
    isProcessing: boolean;
    isFetched: boolean;
    searchResults: IWord[];
    searchText: string;
    wordList: string;
}
