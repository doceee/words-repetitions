import {
    IsEmail,
    MinLength,
    MaxLength,
    IsString,
    IsNotEmpty
} from 'class-validator';

export class LoginDto {
    @MaxLength(100, {
        message: 'Maksymalna ilość znaków: 100.'
    })
    @MinLength(6, { message: 'Minimalna ilość znaków: 6.' })
    @IsEmail(undefined, { message: 'Nieprawidłowy format adresu email.' })
    @IsString({ message: 'Nieprawidwy typ.' })
    @IsNotEmpty({ message: 'To pole nie może być puste.' })
    email: string;

    @MaxLength(60, {
        message: 'Maksymalna ilość znaków: 60.'
    })
    @MinLength(8, { message: 'Minimalna ilość znaków: 8.' })
    @IsString({ message: 'Nieprawidwy typ.' })
    @IsNotEmpty({ message: 'To pole nie może być puste.' })
    password: string;
}
