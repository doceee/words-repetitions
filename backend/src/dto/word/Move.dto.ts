import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class MoveDto {
    @IsString({ message: 'Nieprawidwy typ.' })
    @IsNotEmpty({ message: 'To pole nie może być puste.' })
    wordList: string;

    @IsArray({ message: 'Nieprawidwy typ.' })
    @ArrayNotEmpty({ message: 'To pole nie może być puste.' })
    wordIds: string[];
}
