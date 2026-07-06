import { PostgresDatabase } from '../database/PostgresDatabase';

/**
 * Handles locator persistence operations.
 *
 * Responsible for:
 * - Saving locator history
 * - Updating locator reliability
 * - Retrieving best matching locator
 */
export class LocatorRepository {
  private static readonly TABLE_NAME = 'locator_history';

  constructor(private db: PostgresDatabase) {}

  /**
   * Saves a locator or updates reliability when it already exists.
   */
  async saveLocator(elementName: string, locator: string, pageName: string): Promise<void> {
    const existingLocator = await this.findExistingLocator(elementName, locator, pageName);

    if (existingLocator) {
      await this.updateLocatorSuccessCount(elementName, locator, pageName);

      console.log(`Updated locator: ${elementName}`);

      return;
    }

    await this.insertLocator(elementName, locator, pageName);

    console.log(`New locator saved: ${elementName}`);
  }

  /**
   * Finds the most reliable locator based on success count.
   */
  async findLocator(elementName: string, pageName: string): Promise<string | null> {
    const result = await this.db.getClient().query(
      `
      SELECT locator
      FROM ${LocatorRepository.TABLE_NAME}
      WHERE
        element_name = $1
        AND page_name = $2
      ORDER BY success_count DESC
      LIMIT 1
      `,
      [elementName, pageName],
    );

    if (!result.rows.length) {
      console.log(`No historical locator found: ${elementName}`);

      return null;
    }

    console.log(`Historical locator found: ${elementName}`);

    return result.rows[0].locator;
  }

  /**
   * Checks whether locator already exists.
   */
  private async findExistingLocator(
    elementName: string,
    locator: string,
    pageName: string,
  ): Promise<boolean> {
    const result = await this.db.getClient().query(
      `
      SELECT id
      FROM ${LocatorRepository.TABLE_NAME}
      WHERE
        element_name = $1
        AND locator = $2
        AND page_name = $3
      `,
      [elementName, locator, pageName],
    );

    return result.rows.length > 0;
  }

  /**
   * Inserts a new locator record.
   */
  private async insertLocator(
    elementName: string,
    locator: string,
    pageName: string,
  ): Promise<void> {
    await this.db.getClient().query(
      `
      INSERT INTO ${LocatorRepository.TABLE_NAME}
      (
        element_name,
        locator,
        page_name,
        success_count
      )
      VALUES ($1, $2, $3, $4)
      `,
      [elementName, locator, pageName, 1],
    );
  }

  /**
   * Updates locator success count.
   */
  private async updateLocatorSuccessCount(
    elementName: string,
    locator: string,
    pageName: string,
  ): Promise<void> {
    await this.db.getClient().query(
      `
      UPDATE ${LocatorRepository.TABLE_NAME}
      SET success_count = success_count + 1
      WHERE
        element_name = $1
        AND locator = $2
        AND page_name = $3
      `,
      [elementName, locator, pageName],
    );
  }
}
