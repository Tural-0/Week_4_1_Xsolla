import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },

  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 100,        // absolute budget, not a percentage
      animations: 'disabled',    // freeze CSS transitions
      caret: 'hide',             // stop a blinking cursor failing the test
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

  webServer: {
    command: 'python -m http.server 5173 --directory public',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
