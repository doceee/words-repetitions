import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CSRF_TOKEN_HEADER } from '../config/constants';

export const useCors = (app: NestExpressApplication) => {
    const configService = app.get(ConfigService);
    const whitelist = [
        configService.get('app.frontendUrl'),
        'http://localhost:8080'
    ];

    app.enableCors({
        origin: function (origin, callback) {
            if (!origin || whitelist.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        exposedHeaders: [CSRF_TOKEN_HEADER]
    });
};
