import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisClientService {
    async create(port: number, host: string) {
        const client = createClient({
            socket: {
                port,
                host
            },
            legacyMode: true
        });

        await client.connect();

        return client;
    }
}
