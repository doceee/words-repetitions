import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as connectRedis from 'connect-redis';
import * as expressSession from 'express-session';
import { createClient } from 'redis';

export const useSession = async (app: NestExpressApplication) => {
    const configService = app.get(ConfigService);
    const oneHour = 3600 * 1000 * 1;
    const redisClient = createClient({
        url: `redis://default:${configService.get(
            'redisSession.password'
        )}@${configService.get('redisSession.host')}:${configService.get(
            'redisSession.port'
        )}`,
        legacyMode: true
    });

    redisClient.on('connect', () => {
        console.info('Redis Client connected');
    });

    redisClient.on('error', err => {
        console.info('Redis Client Error: ' + err.message);
    });

    try {
        await redisClient.connect();
    } catch (error) {
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
