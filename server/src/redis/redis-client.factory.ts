import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisClientService {
  async create(url: string) {
    const client = createClient({
      url,
      legacyMode: true,
    });

    await client.connect();

    return client;
  }
}
