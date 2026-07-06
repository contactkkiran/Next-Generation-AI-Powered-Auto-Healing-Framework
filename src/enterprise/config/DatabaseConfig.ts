import { ClientConfig } from 'pg';

/**
 * Provides PostgreSQL configuration.
 */
export class DatabaseConfig {
  static getConfig(): ClientConfig {
    return {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME || 'healingdb',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgre',
    };
  }
}
