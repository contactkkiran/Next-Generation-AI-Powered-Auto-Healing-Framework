import { Page } from '@playwright/test';
import { FrameworkLogger } from '../utils/FrameworkLogger';

export class RetryEngine {
  static async execute(page: Page, action: () => Promise<void>) {
    for (let i = 1; i <= 3; i++) {
      try {
        FrameworkLogger.log(`🔄 Executing attempt ${i} of 3`);

        await action();

        FrameworkLogger.log(`✅ Attempt ${i} completed successfully`);

        return;
      } catch (error: any) {
        FrameworkLogger.log(`❌ Attempt ${i} failed`);

        FrameworkLogger.log(`Error: ${error.message}`);

        if (!page.isClosed()) {
          const screenshotPath = `retry-${i}.png`;

          await page.screenshot({
            path: screenshotPath,
          });

          FrameworkLogger.log(`📸 Screenshot captured: ${screenshotPath}`);
        }

        if (i === 3) {
          FrameworkLogger.log('🚨 Maximum retry attempts reached');

          throw error;
        }

        FrameworkLogger.log('♻️ Retrying action...');
      }
    }
  }
}
