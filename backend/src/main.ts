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
import { ExceptionsFilter } from './filters/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    useCors(app);
    useHelmet(app);
    useValidationPipe(app);

    app.setGlobalPrefix('api');

    app.useGlobalFilters(new ExceptionsFilter());

    await useSession(app);

    const port = app.get(ConfigService).get('app.port');

    closeAppWithGrace(app);

    await app.listen(port);
}

bootstrap();
