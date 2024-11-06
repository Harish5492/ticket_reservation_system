import { Injectable, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';
import { EM } from 'src/constants';
import { throwError } from './responseHandeler';

@Injectable()
export class RedisService implements OnModuleInit {
  private client: Redis;

  onModuleInit() {
    this.client = new Redis({ db: +EM.REDIS.DB });
  }

  async set(
    key: string,
    value: string | number | Buffer,
    db: number = +EM.REDIS.DB,
    expiresIn: number = 0,
  ): Promise<void> {
    try {
      if (db !== 0) await this.client.select(db);
      await this.client.set(key, value);
      if (expiresIn > 0) {
        await this.client.expire(key, expiresIn); // Expires in seconds
      }
    } catch (error) {
      throwError(error);
    }
  }

  async get(
    key: string,
    db: number = +EM.REDIS.DB,
  ): Promise<string | number | Buffer> {
    try {
      if (db !== 0) await this.client.select(db);
      const data = await this.client.get(key);
      return data;
    } catch (error) {
      throwError(error);
    }
  }

  async getAllKeys(db: number = +EM.REDIS.DB): Promise<string[]> {
    try {
      if (db !== 0) await this.client.select(db);
      return await this.client.keys('*');
    } catch (error) {
      throwError(error);
    }
  }

  async getMultipleValues(
    keys: string[],
    db: number = +EM.REDIS.DB,
  ): Promise<any[]> {
    try {
      if (db !== 0) await this.client.select(db);
      const values = await this.client.mget(keys); // Fetch multiple values by their keys
      return values;
    } catch (error) {
      throwError(error);
    }
  }

  async delete(key: string, db: number = +EM.REDIS.DB): Promise<void> {
    try {
      if (db !== 0) await this.client.select(db);
      await this.client.del(key);
    } catch (error) {
      throwError(error);
    }
  }

  async onModuleDestroy() {
    await this.client.quit();
  }
}
