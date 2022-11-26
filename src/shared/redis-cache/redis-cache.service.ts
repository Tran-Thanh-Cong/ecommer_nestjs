import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async get(key: string): Promise<string> {
    return await this.cacheManager.get(key);
  }

  async set(key: string, value: any, ttl: number): Promise<void> {
    return await this.cacheManager.set(key, value, ttl);
  }

  async del(key: string): Promise<void> {
    return await this.cacheManager.del(key);
  }
}
