import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDto {
    @IsString({ message: 'Nieprawidwy typ.' })
    @IsNotEmpty({ message: 'To pole nie może być puste.' })
    activity: string;
}
