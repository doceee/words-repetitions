import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

export const useCors = (app: NestExpressApplication) => {
    const configService = app.get(ConfigService);

    app.enableCors({
        origin: [configService.get('frontendUrl')],
        credentials: true,
        allowedHeaders: 'Content-Type,uid'
    });
};
