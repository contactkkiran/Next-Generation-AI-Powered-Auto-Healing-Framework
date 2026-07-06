import { Client } from 'pg';
import { IDatabase } from './IDatabase';

export class PostgresDatabase implements IDatabase {
  private client!: Client;

  async connect(): Promise<void> {
    this.client = new Client({
      host: 'localhost',
      port: 5432,
      database: 'healingdb',
      user: 'postgres',
      password: 'postgre',
    });

    try {
      await this.client.connect();

      console.log('✅ Connected to PostgreSQL');
    } catch (error) {
      console.log('❌ PostgreSQL connection failed');

      throw error;
    }
  }

  getClient(): Client {
    return this.client;
  }
}
