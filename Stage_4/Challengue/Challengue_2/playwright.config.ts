import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4001',
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
     name: 'Firefox', 
     use: { ...devices['Desktop Firefox'],
        viewport: {width:1920, height:1080}
      },
      retries:2
    },
    {
      name: 'Android',
      use: { ...devices['Pixel 8']},
       retries:1
    },
    {
      name: 'Mobile Safari',
      use: {...devices['iPhone 13']},
      retries:1
    },
    {
      name: 'Tablet',
      use: {...devices['iPad Pro 11']},
      retries:1
    }
  ],
});

