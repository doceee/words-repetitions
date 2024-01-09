import helmet from 'helmet';
import * as session from 'express-session';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { RequestMethod } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './filters/global-exception.filter';
import { RedisClientService } from './redis/redis-client.factory';
import { RedisStoreService } from './redis/redis-store.factory';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService);
  const redisStoreService = app.get(RedisStoreService);
  const redisClientService = app.get(RedisClientService);

  const redisClient = await redisClientService.create(
    configService.get('redisSession.url'),
  );

  app.use(
    session({
      store: redisStoreService.create(redisClient),
      secret: configService.get('sessionSecret'),
      name: 'sid',
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        maxAge: 3600 * 1000,
        secure:
          configService.get('isProduction') &&
          configService.get('appUrl').startsWith('https'),
      },
    }),
  );

  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  app.set('trust proxy', true);
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          'frame-ancestors': ["'self'", configService.get('frontendUrl')],
        },
      },
    }),
  );

  app.enableCors({
    origin: [configService.get('frontendUrl')],
    credentials: true,
  });

  await app.listen(configService.get('appPort'));
}

bootstrap();
