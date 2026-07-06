// Whenever an element is found successfully, save its information automatically.

import { Page } from '@playwright/test';
import * as fs from 'fs';

export class DOMSnapshotEngine {
  static async capture(page: Page, locator: string, elementName: string) {
    try {
      // Do not continue if browser/page is closed
      if (page.isClosed()) {
        return;
      }

      const element = page.locator(locator).first();

      // Verify element exists
      const count = await element.count();

      if (count === 0) {
        console.log(`⚠️ Snapshot skipped. Element not found: ${locator}`);
        return;
      }

      // Lightweight snapshot collection
      const snapshot = {
        elementName,

        locator,

        capturedOn: new Date().toISOString(),
      };

      // Append to file
      fs.appendFileSync('dom-snapshots.json', JSON.stringify(snapshot) + '\n');

      console.log(`📸 DOM Snapshot captured for ${elementName}`);
    } catch (error: any) {
      console.log(`⚠️ Unable to capture DOM snapshot: ${error.message}`);
    }
  }
}
