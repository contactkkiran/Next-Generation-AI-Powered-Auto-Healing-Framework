import { Locator } from '@playwright/test';
import { FrameworkLogger } from '../utils/FrameworkLogger';

export class DynamicWaitEngine {
  static async wait(locator: Locator) {
    FrameworkLogger.log('⏳ Waiting for element to become visible');

    await locator.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    FrameworkLogger.log('✅ Element is visible and ready for interaction');
  }
}
