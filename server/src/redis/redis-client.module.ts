import { Module } from '@nestjs/common';
import { RedisClientService } from './redis-client.factory';
import { RedisStoreService } from './redis-store.factory';

@Module({
  providers: [RedisClientService, RedisStoreService],
  exports: [RedisClientService, RedisStoreService],
})
export class RedisClientModule {}
