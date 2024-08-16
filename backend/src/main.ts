import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { useCors } from './plugins/cors';
import { AppModule } from './modules/app.module';
import { useValidationPipe } from './plugins/validationPipe';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    useCors(app);
    useValidationPipe(app);

    app.setGlobalPrefix('api');

    const port = app.get(ConfigService).get('app.port');

    await app.listen(port);

    process.on('SIGTERM', async () => {
        await app.close();
    });

    process.on('SIGINT', async () => {
        await app.close();
    });
}

bootstrap();
