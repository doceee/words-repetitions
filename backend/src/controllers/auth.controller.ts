import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { LoginDto } from '../dto/auth/LoginDto';
import { MeService } from '../services/auth/MeService';
import { LoginService } from '../services/auth/LoginService';
import { LogoutService } from '../services/auth/LogoutService';
import { LoggedUserGuard } from '../middlewares/LoggedUserGuard';
import { RegisterDto } from '../dto/auth/RegisterDto';
import { RegisterService } from '../services/auth/RegisterService';
import { Response, Request } from 'express';

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

    @HttpCode(HttpStatus.OK)
    @Post('/login')
    login(
        @Body()
        dto: LoginDto,
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response
    ) {
        return this.loginService.handle(dto, req, res);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('/register')
    register(
        @Body()
        dto: RegisterDto,
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response
    ) {
        return this.registerService.handle(dto, req, res);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Post('/logout')
    logout(@Req() req: Request) {
        return this.logoutService.handle(req);
    }
}
