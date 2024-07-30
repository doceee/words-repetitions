export interface IWord {
    id: string;
    word: string;
    translation: string;
    userId: string;
}

export interface IWordState {
    words: IWord[];
    isProcessing: boolean;
    isFetched: boolean;
    searchResults: IWord[];
    searchText: string;
}
