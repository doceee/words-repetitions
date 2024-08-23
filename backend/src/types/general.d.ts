export interface TranslationResponse {
    word: string;
    translation: string;
    wordTranscription: string;
    translationTranscription: string | null;
    translations: Record<string, string[]>;
    definitions: Record<string, string[]>;
    examples: string[];
}
