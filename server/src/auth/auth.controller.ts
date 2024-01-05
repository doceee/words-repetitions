import {
  Req,
  Body,
  Get,
  Post,
  HttpCode,
  UseGuards,
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { GetUser } from './decorator';
import { User } from '@prisma/client';
import { LoggedInGuard } from './guard';
import { Request } from 'express';
import { ValidationError } from 'class-validator';
import { BadRequestException } from '../exceptions/bad.request.exception';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LoggedInGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @HttpCode(200)
  @Post('login')
  async login(
    @Req() request: Request,
    @Body(
      new ValidationPipe({
        whitelist: true,
        exceptionFactory: (errors: ValidationError[] = []) =>
          new BadRequestException(errors),
      }),
    )
    dto: LoginDto,
  ) {
    const user = await this.authService.login(dto);

    request.session.user = user.id;
    request.user = user;

    return user;
  }

  @Post('register')
  async register(
    @Req() request: Request,
    @Body(
      new ValidationPipe({
        whitelist: true,
        exceptionFactory: (errors: ValidationError[] = []) =>
          new BadRequestException(errors),
      }),
    )
    dto: RegisterDto,
  ) {
    const user = await this.authService.register(dto);

    request.session.user = user.id;
    request.user = user;

    return user;
  }

  @HttpCode(204)
  @Post('logout')
  logout(@Req() request: Request) {
    return new Promise<void>((resolve) =>
      request.session.destroy((error) => {
        if (error) {
          throw error;
        }

        resolve();
      }),
    );
  }
}
