import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as connectRedis from 'connect-redis';
import * as expressSession from 'express-session';
import { createClient } from 'redis';

import { type NestExpressApplication } from '@nestjs/platform-express';

export const useSession = async (app: NestExpressApplication) => {
    const configService = app.get(ConfigService);
    const oneHour = 3600 * 1000 * 1;
    const logger = new Logger('Session');

    const redisClient = createClient({
        socket: {
            port: configService.get('redisSession.port'),
            host: configService.get('redisSession.host')
        },
        legacyMode: true
    });
    redisClient.on('connect', () => {
        logger.log('Redis Client connected');
    });

    redisClient.on('error', err => {
        logger.error('Redis Client Error: ' + err.message);
    });

    try {
        await redisClient.connect();
    } catch (error) {
        logger.error('Failed to connect to Redis: ' + error.message);
        throw Error(error);
    }

    const RedisStore = connectRedis(expressSession);
    const store = new RedisStore({ client: redisClient });

    app.use(
        expressSession({
            store,
            secret: configService.get('session.secret'),
            name: 'token',
            resave: false,
            saveUninitialized: false,
            rolling: true,
            cookie: {
                maxAge: oneHour,
                secure:
                    configService.get('app.isProd') &&
                    configService.get('app.appUrl').startsWith('https')
            }
        })
    );
};
