import { Prisma } from '@prisma/client';

interface SelectMap {
    User: Prisma.UserSelect;
    Word: Prisma.WordSelect;
}

interface PayloadMap<S extends string | number | symbol> {
    User: Prisma.UserGetPayload<{ [K in S]: true }>;
    Word: Prisma.WordGetPayload<{ [K in S]: true }>;
}

type FullModel<
    M extends keyof SelectMap,
    S = Required<SelectMap[M]>
> = PayloadMap<keyof S>[M];

export interface TranslationResponse {
    word: string;
    translation: string;
    wordTranscription: string;
    translationTranscription: string | null;
    translations: Record<string, string[]>;
    definitions: Record<string, string[]>;
    examples: string[];
}
