import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class EditWordDto {
    @MaxLength(40, {
        message: 'Maksymalna ilość znaków: 40.'
    })
    @MinLength(2, { message: 'Minimalna ilość znaków: 2.' })
    @IsString({ message: 'Nieprawidwy typ.' })
    @IsOptional()
    word: string;

    @MaxLength(40, {
        message: 'Maksymalna ilość znaków: 40.'
    })
    @MinLength(2, { message: 'Minimalna ilość znaków: 2.' })
    @IsString({ message: 'Nieprawidwy typ.' })
    @IsOptional()
    translation: string;
}
