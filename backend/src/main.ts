import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { useCors } from './plugins/cors';
import { AppModule } from './modules/app.module';
import { useHeaders } from './plugins/headers';
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

    useHeaders(app);

    app.useGlobalFilters(new CatchEverythingFilter());

    const port = app.get(ConfigService).get('app.port');

    await app.listen(port);

    closeAppWithGrace(app);
}

bootstrap();
