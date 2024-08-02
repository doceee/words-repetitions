import { Match } from '../../decorators/Match.decorator';

import { LoginDto } from '../../dto/auth/LoginDto';

export class RegisterDto extends LoginDto {
    @Match('password', { message: 'Hasła różnią się od siebie.' })
    passwordRepeat: string;
}
