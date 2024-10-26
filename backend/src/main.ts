import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { useCors } from './plugins/cors';
import { AppModule } from './modules/app.module';
import { useValidationPipe } from './plugins/validationPipe';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useHelmet } from './plugins/helmet';
import { loadGetPortModule } from './helpers/modules-load';
import { closeAppWithGrace } from './helpers/close-app';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    useCors(app);
    useHelmet(app);
    useValidationPipe(app);

    app.setGlobalPrefix('api');

    const isDevelopment = app.get(ConfigService).get('app.isDevelopment');
    const portToUse = app.get(ConfigService).get('app.port');

    const getPort = (await loadGetPortModule()).default;
    const port = await getPort({
        port: portToUse
    });
    const isPortAvailable = port === portToUse;

    if (!isPortAvailable && !isDevelopment) {
        console.log(`Port ${port} is not available.`);
        process.exit(1);
    }

    closeAppWithGrace(app);

    await app.listen(port);
}

bootstrap();
