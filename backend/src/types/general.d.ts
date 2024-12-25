export interface TranslationResponse {
    alternatives: string[];
    detectedLanguage: { confidence: number; language: string };
    translatedText: string;
}
