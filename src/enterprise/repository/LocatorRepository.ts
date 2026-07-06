import { PostgresDatabase } from '../database/PostgresDatabase';

export class LocatorRepository {
  constructor(private db: PostgresDatabase) {}

  async saveLocator(elementName: string, locator: string, pageName: string): Promise<void> {
    const client = this.db.getClient();

    // Check whether locator already exists
    const result = await client.query(
      `
      SELECT success_count
      FROM locator_history
      WHERE
        element_name = $1
        AND locator = $2
        AND page_name = $3
      `,
      [elementName, locator, pageName],
    );

    // Locator already exists
    if (result.rows.length > 0) {
      await client.query(
        `
        UPDATE locator_history
        SET success_count =
            success_count + 1
        WHERE
          element_name = $1
          AND locator = $2
          AND page_name = $3
        `,
        [elementName, locator, pageName],
      );

      console.log(`🔄 Updated locator: ${elementName}`);
    }

    // New locator
    else {
      await client.query(
        `
        INSERT INTO locator_history
        (
          element_name,
          locator,
          page_name,
          success_count
        )
        VALUES
        ($1,$2,$3,$4)
        `,
        [elementName, locator, pageName, 1],
      );

      console.log(`✅ New locator saved: ${elementName}`);
    }
  }

  async findLocator(elementName: string, pageName: string): Promise<string | null> {
    const client = this.db.getClient();

    const result = await client.query(
      `
    SELECT locator
    FROM locator_history
    WHERE
      element_name = $1
      AND page_name = $2
    ORDER BY success_count DESC
    LIMIT 1
    `,
      [elementName, pageName],
    );

    if (result.rows.length > 0) {
      console.log(`✅ Historical locator found for ${elementName}`);

      return result.rows[0].locator;
    }

    console.log(`❌ No historical locator found for ${elementName}`);

    return null;
  }
}
