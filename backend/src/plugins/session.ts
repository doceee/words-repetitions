import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
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

    try {
        await redisClient.connect();
        console.log('test');
    } catch (error) {
        throw Error(error);
    }

    const RedisStore = connectRedis(expressSession);
    const store = new RedisStore({ client: redisClient });

    app.use(
        expressSession({
            store,
            secret: configService.get('sessionSecret'),
            name: 'token',
            resave: false,
            saveUninitialized: false,
            rolling: true,
            cookie: {
                maxAge: oneHour,
                secure:
                    configService.get('isProduction') &&
                    configService.get('appUrl').startsWith('https')
            }
        })
    );
};
