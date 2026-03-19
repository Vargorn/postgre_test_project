import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;
  private readonly logger = new Logger(DatabaseService.name);

  constructor(private configService: ConfigService) {
    const dbConfig = this.configService.get('database');
    
    this.pool = new Pool({
      host: dbConfig.host,
      port: dbConfig.port,
      database: dbConfig.name,
      user: dbConfig.user,
      password: dbConfig.password,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }

  async onModuleInit() {
    try {
      const client = await this.pool.connect();
      client.release();
      this.logger.log('✅ Connected to PostgreSQL database');
    } catch (error) {
      this.logger.error('❌ Failed to connect to database', error.stack);
      process.exit(1);
    }
  }

  async onModuleDestroy() {
    await this.pool.end();
    this.logger.log('Database connection closed');
  }

  async query(text: string, params?: any[]): Promise<QueryResult> {
    const start = Date.now();
    try {
      const result = await this.pool.query(text, params);
      const duration = Date.now() - start;
      this.logger.debug(`Executed query (${duration}ms): ${text.substring(0, 100)}...`);
      return result;
    } catch (error) {
      this.logger.error(`Query failed: ${text.substring(0, 100)}...`, error.stack);
      throw error;
    }
  }

  async callFunction<T>(functionName: string, params: any[] = []): Promise<T[]> {
    const placeholders = params.map((_, index) => `$${index + 1}`).join(', ');
    const queryText = `SELECT * FROM ${functionName}(${placeholders})`;
    const result = await this.query(queryText, params);
    return result.rows as T[];
  }
}