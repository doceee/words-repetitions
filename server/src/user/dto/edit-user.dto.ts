import { IsEmail, IsNotEmpty } from 'class-validator';

export class EditUserDto {
  @IsEmail()
  @IsNotEmpty({ message: 'To pole nie może być puste.' })
  email: string;
}
