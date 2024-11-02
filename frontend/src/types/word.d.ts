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
}
