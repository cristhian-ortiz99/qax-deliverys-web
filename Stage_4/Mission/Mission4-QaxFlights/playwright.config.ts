import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  workers: 3,
  fullyParallel: true,
  projects: [
    {
      name: 'Desktop Chrome',
      use: { browserName: 'chromium',
        viewport: {width:1920, height:1080},
        headless:false
       },
       retries:1
    },
    {
    name: 'iPad Mini',
    use: {
      ...devices['iPad Mini'],
    },
    },
    {
    name: 'iPhone 14',
    use: {
      ...devices['iPhone 14'],
    },
    },
    {
    name: 'Pixel 7',
    use: {
      ...devices['Pixel 7'],
    },
    },
  ],
});

