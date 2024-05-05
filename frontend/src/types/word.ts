export interface IWord {
    id: string;
    word: string;
    translation: string;
    userId: string;
}

export interface IWordState {
    words: IWord[];
    isProcessing: boolean;
    searchResults: IWord[];
    searchText: string;
}
