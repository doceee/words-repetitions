import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength
} from 'class-validator';
import { Match } from '../decorator';

export class RegisterDto {
    @MaxLength(100, {
        message: 'Maksymalna ilość znaków: 100.'
    })
    @MinLength(6, { message: 'Minimalna ilość znaków: 6.' })
    @IsEmail({}, { message: 'Nieprawidłowy format adresu email.' })
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

    @Match('password', { message: 'Hasła różnią się od siebie.' })
    passwordRepeat: string;
}

export class LoginDto {
    @MaxLength(100, {
        message: 'Maksymalna ilość znaków: 100.'
    })
    @MinLength(6, { message: 'Minimalna ilość znaków: 6.' })
    @IsEmail({}, { message: 'Nieprawidłowy format adresu email.' })
    @IsString({ message: 'Nieprawidwy typ.' })
    @IsNotEmpty({ message: 'To pole nie może być puste.' })
    email: string;

    @MaxLength(60, {
        message: 'Maksymalna ilość znaków: 60.'
    })
    @MinLength(6, { message: 'Minimalna ilość znaków: 8.' })
    @IsString({ message: 'Nieprawidwy typ.' })
    @IsNotEmpty({ message: 'To pole nie może być puste.' })
    password: string;
}
