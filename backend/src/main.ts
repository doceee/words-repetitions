import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './filters/global-exception.filter';
import { useContainer } from 'class-validator';
import { useSession } from './plugins/session';
import { useCors } from './plugins/cors';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    const configService = app.get(ConfigService);

    await useSession(app);

    app.setGlobalPrefix('api');

    app.useGlobalFilters(new HttpExceptionFilter());

    app.set('trust proxy', true);
    app.use(helmet());

    useCors(app);

    await app.listen(configService.get('appPort'));
}

bootstrap();
