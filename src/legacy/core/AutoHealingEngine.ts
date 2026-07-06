import { Page } from '@playwright/test';
import { FrameworkLogger } from '../utils/FrameworkLogger';
import { MCPClient } from './MCPClient';

// Old Implemetatiom

// export class AutoHealingEngine {
//   private mcpClient = new MCPClient();

//   private static healedLocators: string[] = [];

//   constructor(private page: Page) {}

//   static addHealing(oldLocator: string, newLocator: string) {
//     this.healedLocators.push(
//       `🤖 AUTO-HEALING APPLIED

// Old Locator:
// ${oldLocator}

// New Locator:
// ${newLocator}

// ----------------------------------------`,
//     );
//   }

//   static getHealingSummary(): string {
//     if (this.healedLocators.length === 0) {
//       return 'No Auto-Healing was required.';
//     }

//     return this.healedLocators.join('\n');
//   }

//   static clearHealingSummary() {
//     this.healedLocators = [];
//   }

//   async find(locator: string): Promise<string> {
//     FrameworkLogger.log(`🔍 Looking for locator: ${locator}`);

//     if ((await this.page.locator(locator).count()) === 1) {
//       FrameworkLogger.log(`✅ Original locator found: ${locator}`);

//       return locator;
//     }

//     FrameworkLogger.log(`⚠️ Locator not found: ${locator}`);

//     FrameworkLogger.log(`🤖 Auto-Healing Engine Activated`);

//     const healed = await this.mcpClient.healLocator(locator);

//     FrameworkLogger.log(`✨ Locator healed successfully`);

//     FrameworkLogger.log(`🔄 Old Locator : ${locator}`);

//     FrameworkLogger.log(`🆕 New Locator : ${healed}`);

//     AutoHealingEngine.addHealing(locator, healed);

//     return healed;
//   }
// }

// import { Page } from '@playwright/test';
// import { MCPClient } from './MCPClient';
// import { FrameworkLogger } from '../utils/FrameworkLogger';

// Updated Implmentation

export class AutoHealingEngine {
  private mcpClient = new MCPClient();

  private static healedLocators: string[] = [];

  constructor(private page: Page) {}

  static addHealing(oldLocator: string, newLocator: string) {
    this.healedLocators.push(
      `🤖 AUTO-HEALING APPLIED

Old Locator:
${oldLocator}

New Locator:
${newLocator}

----------------------------------------`,
    );
  }

  static getHealingSummary(): string {
    if (this.healedLocators.length === 0) {
      return 'No Auto-Healing was required.';
    }

    return this.healedLocators.join('\n');
  }

  static clearHealingSummary() {
    this.healedLocators = [];
  }

  async find(locator: string): Promise<string> {
    // Check whether page is still open
    if (this.page.isClosed()) {
      throw new Error('Browser page has already been closed.');
    }

    FrameworkLogger.log(`🔍 Looking for locator: ${locator}`);

    try {
      const count = await this.page.locator(locator).count();

      if (count === 1) {
        FrameworkLogger.log(`✅ Original locator found: ${locator}`);

        return locator;
      }
    } catch (error) {
      FrameworkLogger.log(`⚠️ Unable to validate locator: ${locator}`);
    }

    FrameworkLogger.log(`⚠️ Locator not found: ${locator}`);

    FrameworkLogger.log(`🤖 Auto-Healing Engine Activated`);

    const healed = await this.mcpClient.healLocator(locator);

    FrameworkLogger.log(`✨ Locator healed successfully`);

    FrameworkLogger.log(`🔄 Old Locator : ${locator}`);

    FrameworkLogger.log(`🆕 New Locator : ${healed}`);

    AutoHealingEngine.addHealing(locator, healed);

    return healed;
  }
}
