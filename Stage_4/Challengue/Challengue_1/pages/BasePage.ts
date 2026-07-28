import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(url: string = '/lab/sites/stage-4/marketplace/index.html'): Promise<void> {
      await this.page.goto(url);
  }
  async reload(): Promise<void> {
        await this.page.reload();
    }
}