import { PostgresDatabase } from './PostgresDatabase';

export class DatabaseInitializer {
  static async initialize(db: PostgresDatabase): Promise<void> {
    const client = db.getClient();

    await client.query(`
      CREATE TABLE IF NOT EXISTS locator_history (

        id SERIAL PRIMARY KEY,

        element_name VARCHAR(255),

        locator TEXT,

        page_name VARCHAR(255),

        success_count INT DEFAULT 0,

        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        UNIQUE(element_name, locator, page_name)

      );
    `);

    console.log('✅ locator_history table created');
  }
}
