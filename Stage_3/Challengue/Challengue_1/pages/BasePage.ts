import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(url: string = '/lab/sites/stage-3/haguazon/index.html'): Promise<void> {
      await this.page.goto(url);
  }
}