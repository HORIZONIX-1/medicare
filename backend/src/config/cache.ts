import { createClient, RedisClientType } from "redis";

type CacheValue = string;

const memoryCache = new Map<string, { value: CacheValue; expiresAt: number }>();
let redisClient: RedisClientType | null = null;
let redisInitAttempted = false;

const now = () => Date.now();

const getMemory = (key: string): string | null => {
  const hit = memoryCache.get(key);
  if (!hit) return null;
  if (hit.expiresAt <= now()) {
    memoryCache.delete(key);
    return null;
  }
  return hit.value;
};

const setMemory = (key: string, value: string, ttlSeconds: number) => {
  memoryCache.set(key, { value, expiresAt: now() + ttlSeconds * 1000 });
};

const initRedis = async () => {
  if (redisInitAttempted) return redisClient;
  redisInitAttempted = true;

  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) return null;

  try {
    redisClient = createClient({ url: redisUrl });
    redisClient.on("error", (error) => {
      console.error("Redis client error:", error?.message || error);
    });
    await redisClient.connect();
    return redisClient;
  } catch (error) {
    console.error("Redis unavailable, using in-memory cache fallback:", (error as Error)?.message || error);
    redisClient = null;
    return null;
  }
};

export const getCache = async <T>(key: string): Promise<T | null> => {
  try {
    const client = await initRedis();
    if (client) {
      const value = await client.get(key);
      return value ? (JSON.parse(value) as T) : null;
    }

    const fallback = getMemory(key);
    return fallback ? (JSON.parse(fallback) as T) : null;
  } catch {
    const fallback = getMemory(key);
    return fallback ? (JSON.parse(fallback) as T) : null;
  }
};

export const setCache = async (key: string, value: unknown, ttlSeconds: number): Promise<void> => {
  const payload = JSON.stringify(value);

  try {
    const client = await initRedis();
    if (client) {
      await client.set(key, payload, { EX: ttlSeconds });
      return;
    }
    setMemory(key, payload, ttlSeconds);
  } catch {
    setMemory(key, payload, ttlSeconds);
  }
};
