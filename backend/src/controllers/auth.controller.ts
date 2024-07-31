import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { LoginDto } from '@/dto/Auth/LoginDto';
import { MeService } from '@/services/auth/MeService';
import { LoginService } from '@/services/auth/LoginService';
import { LogoutService } from '@/services/auth/LogoutService';
import { Request } from '@/types/common';
import { LoggedUserGuard } from '@/middlewares/LoggedUserGuard';
import { RegisterDto } from '@/dto/Auth/RegisterDto';
import { RegisterService } from '@/services/auth/RegisterService';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(
        private readonly meService: MeService,
        private readonly loginService: LoginService,
        private readonly registerService: RegisterService,
        private readonly logoutService: LogoutService
    ) {}

    @Get('/me')
    @UseGuards(LoggedUserGuard)
    me(@Req() req: Request) {
        return this.meService.handle(req);
    }

    @Post('/login')
    login(
        @Body()
        dto: LoginDto,
        @Req() req: Request
    ) {
        return this.loginService.handle(dto, req);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('/register')
    register(
        @Body()
        dto: RegisterDto,
        @Req() req: Request
    ) {
        return this.registerService.handle(dto, req);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Post('/logout')
    logout(@Req() req: Request) {
        return this.logoutService.handle(req);
    }
}
