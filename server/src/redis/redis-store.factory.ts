import { Injectable } from '@nestjs/common';
import * as connectRedis from 'connect-redis';
import * as session from 'express-session';

import type {
  RedisScripts,
  RedisModules,
  RedisFunctions,
  RedisClientType,
} from 'redis';

@Injectable()
export class RedisStoreService {
  create(
    redisClient: RedisClientType<RedisModules, RedisFunctions, RedisScripts>,
  ) {
    const RedisStore = connectRedis(session);

    return new RedisStore({ client: redisClient });
  }
}
