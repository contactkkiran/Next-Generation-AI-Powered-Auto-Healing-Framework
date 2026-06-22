import { Page } from '@playwright/test';
import { FrameworkLogger } from '../utils/FrameworkLogger';
import { AutoHealingEngine } from './AutoHealingEngine';

export class ActionEngine {
  constructor(
    private page: Page,
    private healer: AutoHealingEngine,
  ) {}

  async click(locator: string, name: string) {
    const healed = await this.healer.find(locator);

    FrameworkLogger.log(`🖱️ Clicking ${name} -> ${healed}`);

    await this.page.locator(healed).click();

    FrameworkLogger.log(`✅ ${name} clicked successfully`);
  }

  async type(locator: string, value: string, name: string) {
    const healed = await this.healer.find(locator);

    FrameworkLogger.log(`⌨️ Entering ${name} -> ${healed}`);

    await this.page.locator(healed).fill(value);

    FrameworkLogger.log(`✅ ${name} entered successfully`);
  }
}
