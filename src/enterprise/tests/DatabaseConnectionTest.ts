import { DatabaseInitializer } from '../database/DatabaseInitializer';
import { PostgresDatabase } from '../database/PostgresDatabase';
import { LocatorRepository } from '../repository/LocatorRepository';

/**
 * Validates database connection and framework initialization flow.
 */
async function validateFrameworkInitialization(): Promise<void> {
  const database = new PostgresDatabase();

  try {
    await database.connect();
    await DatabaseInitializer.initialize(database);

    const locatorRepository = new LocatorRepository(database);

    // Create test locator history record
    await locatorRepository.saveLocator('Login Button', '[data-test="login-button"]', 'LoginPage');

    console.log('Enterprise framework initialized successfully');
  } catch (error) {
    console.error('Framework initialization failed', error);
  } finally {
    await database.disconnect();
  }
}

validateFrameworkInitialization();
