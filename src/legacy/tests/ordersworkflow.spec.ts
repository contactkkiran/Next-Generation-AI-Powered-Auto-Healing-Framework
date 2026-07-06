import { expect, test } from '@playwright/test';
import { ActionEngine } from '../core/ActionEngine';
import { AutoHealingEngine } from '../core/AutoHealingEngine';
import { DynamicWaitEngine } from '../core/DynamicWaitEngine';
import { RetryEngine } from '../core/RetryEngine';
import { FlakyQuarantineManager } from '../utils/FlakyQuarantineManager';
import { FrameworkLogger } from '../utils/FrameworkLogger';

// test.setTimeout(120000);
test('E2E Order Flow using MCP Framework', async ({ page }, testInfo) => {
  // Clear previous execution logs
  FrameworkLogger.clear();
  AutoHealingEngine.clearHealingSummary();

  // Skip quarantined tests
  if (FlakyQuarantineManager.isQuarantined(testInfo.title)) {
    test.skip();
  }

  const healer = new AutoHealingEngine(page);

  const actions = new ActionEngine(page, healer);

  try {
    FrameworkLogger.log('🚀 Starting E2E Order Flow Test');

    await test.step('Navigate to SauceDemo', async () => {
      await page.goto('https://www.saucedemo.com');

      FrameworkLogger.log('🌐 Navigated to SauceDemo');
    });

    await test.step('Login to Application', async () => {
      // Username
      let locator = await healer.find("[data-test='username']");

      await DynamicWaitEngine.wait(page.locator(locator));

      await actions.type(locator, 'standard_user', 'Username');

      // Password
      locator = await healer.find("[data-test='password']");

      await actions.type(locator, 'secret_sauce', 'Password');

      // Intentionally broken locator
      // to demonstrate Auto-Healing
      locator = await healer.find("[data-test='login-button-old']");

      await RetryEngine.execute(page, async () => {
        await actions.click(locator, 'Login Button');
      });
    });

    await test.step('Add Product to Cart', async () => {
      const locator = await healer.find("[data-test='add-to-cart-sauce-labs-backpack']");

      await actions.click(locator, 'Add Backpack');
    });

    await test.step('Open Shopping Cart', async () => {
      await actions.click('.shopping_cart_link', 'Shopping Cart');
    });

    await test.step('Checkout Order', async () => {
      await actions.click("[data-test='checkout']", 'Checkout');

      await actions.type("[data-test='firstName']", 'Kiran', 'First Name');

      await actions.type("[data-test='lastName']", 'Kanumuri', 'Last Name');

      await actions.type("[data-test='postalCode']", '500050', 'Postal Code');

      await actions.click("[data-test='continue']", 'Continue');
    });

    await test.step('Complete Order', async () => {
      await actions.click("[data-test='finish']", 'Finish');

      await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    });

    FrameworkLogger.log('🎉 E2E Order Flow completed successfully');
  } catch (error: any) {
    FrameworkLogger.log(`❌ Test Failed: ${error.message}`);

    FlakyQuarantineManager.update(testInfo.title, true);

    throw error;
  } finally {
    // Attach execution logs to report
    await testInfo.attach('Self-Healing Execution Logs', {
      body: FrameworkLogger.getLogs(),
      contentType: 'text/plain',
    });

    // Attach healing summary to report
    await testInfo.attach('Auto-Healing Summary', {
      body: AutoHealingEngine.getHealingSummary(),
      contentType: 'text/plain',
    });
  }
});
