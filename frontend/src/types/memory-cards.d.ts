export interface ICardItem {
    word: string;
    id: string;
    clicked: boolean;
    fixed: boolean;
}

export interface IWord {
    word: string;
    translation: string;
    id: string;
}

export interface IMemoryCardsData {
    isCompleted: boolean;
    isProcessing: boolean;
    wordLevel: string;
    gameTime: number;
    timer: NodeJS.Timer | null;
    shuffledArray: ICardItem[];
    selectedCards: ICardItem[];
    levelOptions: { value: string; label: string }[];
}
