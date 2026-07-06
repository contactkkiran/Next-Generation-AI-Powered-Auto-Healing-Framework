import { PostgresDatabase } from '../database/PostgresDatabase';

import { DatabaseInitializer } from '../database/DatabaseInitializer';

import { LocatorRepository } from '../repository/LocatorRepository';

async function testConnection() {
  const db = new PostgresDatabase();

  await db.connect();

  await DatabaseInitializer.initialize(db);

  const locatorRepo = new LocatorRepository(db);

  // Temporary test data
  await locatorRepo.saveLocator('Login Button', '[data-test="login-butt"]', 'LoginPage');

  console.log('🎉 Enterprise Framework Initialization Successful');
}

testConnection();
