import { DatabaseInitializer } from '../database/DatabaseInitializer';
import { PostgresDatabase } from '../database/PostgresDatabase';
import { LocatorRepository } from '../repository/LocatorRepository';

/**
 * Validates enterprise framework database initialization flow.
 */
async function testConnection(): Promise<void> {
  const database = new PostgresDatabase();

  try {
    await database.connect();

    await DatabaseInitializer.initialize(database);

    const locatorRepository = new LocatorRepository(database);

    // Create test locator history record
    await locatorRepository.saveLocator('Login Button', '[data-test="login-button"]', 'LoginPage');

    console.log('Enterprise framework initialized successfully');
  } finally {
    await database.disconnect();
  }
}

testConnection();
