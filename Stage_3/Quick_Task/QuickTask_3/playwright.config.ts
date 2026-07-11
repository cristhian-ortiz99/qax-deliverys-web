import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: 'html',
  retries: 1,

  use: {
    baseURL: 'https://qaxpert.com/lab/sites/stage-3/paylater/',
    headless: true
  }
});