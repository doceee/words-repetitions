import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateWordDto {
  @MaxLength(40, {
    message: 'Maksymalna ilość znaków: 40.',
  })
  @MinLength(2, { message: 'Minimalna ilość znaków: 2.' })
  @IsString({ message: 'Nieprawidwy typ.' })
  @IsNotEmpty({ message: 'To pole nie może być puste.' })
  word: string;

  @MaxLength(40, {
    message: 'Maksymalna ilość znaków: 40.',
  })
  @MinLength(2, { message: 'Minimalna ilość znaków: 2.' })
  @IsString({ message: 'Nieprawidwy typ.' })
  @IsNotEmpty({ message: 'To pole nie może być puste.' })
  translation: string;
}
