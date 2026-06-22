import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',

  fullyParallel: true,

  retries: 0,

  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    headless: false,

    screenshot: 'on',

    video: 'on',

    trace: 'on',

    viewport: {
      width: 1440,
      height: 900,
    },
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
