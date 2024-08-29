import { IsNotEmpty, IsString } from 'class-validator';

export class PatchStatsDto {
    @IsString({ message: 'Nieprawidwy typ.' })
    @IsNotEmpty({ message: 'To pole nie może być puste.' })
    prop: string;

    @IsNotEmpty({ message: 'To pole nie może być puste.' })
    value: unknown;
}
