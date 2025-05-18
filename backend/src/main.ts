import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { useCors } from './plugins/cors';
import { AppModule } from './modules/app.module';
import { useValidationPipe } from './plugins/validationPipe';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useHelmet } from './plugins/helmet';
import { closeAppWithGrace } from './helpers/close-app';
import { useSession } from './plugins/session';
import { CatchEverythingFilter } from './filters/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    useCors(app);
    useHelmet(app);
    useValidationPipe(app);

    await useSession(app);

    app.enableShutdownHooks();
    app.set('trust proxy', 1);

    app.use((req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('Referrer-Policy', 'no-referrer');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        res.setHeader(
            'Content-Security-Policy',
            "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data:; style-src 'self' 'unsafe-inline';"
        );
        res.setHeader('Access-Control-Max-Age', '3600');
        next();
    });

    app.setGlobalPrefix('api');
    app.useGlobalFilters(new CatchEverythingFilter());

    const port = app.get(ConfigService).get('app.port');

    await app.listen(port);

    closeAppWithGrace(app);
}

bootstrap();
