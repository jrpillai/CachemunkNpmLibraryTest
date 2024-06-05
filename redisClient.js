import dotenv from 'dotenv';
dotenv.config();

import { Redis } from 'ioredis';
import { configureCache } from 'cachemunk';

const { REDIS_HOST, REDIS_PORT } = process.env;

export const redis = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT ? parseInt(REDIS_PORT) : 6379,
});

export const cache = configureCache({
  redis,
  onCacheHit: (key, execTime) => {
      console.log(`Cache hit for key: ${key}, Execution time: ${execTime}ms`);
  },
  onCacheMiss: (key, execTime) => {
      console.log(`Cache miss for key: ${key}, Execution time: ${execTime}ms`);
  }
});

export default cache;
