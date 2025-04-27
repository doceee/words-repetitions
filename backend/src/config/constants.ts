export const CSRF_TOKEN_HEADER = 'csrf-token';

export enum WordListType {
    current = 'current',
    learned = 'learned'
}

export const wordLists = [
    { name: `${WordListType.current}`, label: 'W trakcie nauki' },
    { name: `${WordListType.learned}`, label: 'W pełni opanowane' }
];
