import { Client } from 'pg';

import { IDatabase } from './IDatabase';

import { DatabaseConfig } from '../config/DatabaseConfig';

/**
 * PostgresDatabase
 *
 * Responsibility:
 * - Manage PostgreSQL database connection lifecycle
 * - Establish database connection
 * - Provide database client access
 * - Close database connection safely
 *
 * Note:
 * This class does NOT contain SQL logic.
 * SQL operations belong to Repository layer.
 */
export class PostgresDatabase implements IDatabase {
  // PostgreSQL client instance
  private client!: Client;

  // Maintains current database connection status
  private connected = false;

  /**
   * Creates and opens PostgreSQL connection
   */
  async connect(): Promise<void> {
    try {
      // Create PostgreSQL client using configuration
      this.client = new Client(DatabaseConfig.getConfig());
      // Establish connection with PostgreSQL server
      await this.client.connect();
      // Mark connection as active
      this.connected = true;
      console.log('✅ PostgreSQL connection established');
    } catch (error) {
      // Mark connection as inactive if connection fails
      this.connected = false;
      console.error('❌ PostgreSQL connection failed', error);
      // Propagate error to caller
      throw error;
    }
  }

  /**
   * Returns active PostgreSQL client
   *
   * Repository classes use this client
   * to execute database queries.
   */
  getClient(): Client {
    // Prevent database usage before connection
    if (!this.connected) {
      throw new Error('Database is not connected. Call connect() first.');
    }
    return this.client;
  }

  /**
   * Safely closes PostgreSQL connection
   */
  async disconnect(): Promise<void> {
    // No action required if already disconnected
    if (!this.connected) {
      return;
    }
    // Close PostgreSQL connection
    await this.client.end();
    // Update connection status
    this.connected = false;
    console.log('🔌 PostgreSQL connection closed');
  }
}
