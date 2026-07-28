import type { Page, Locator } from '@playwright/test';

export class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async doClick(locator: Locator): Promise<void> {
    console.log('Click en:', await locator.toString());
    await locator.click();
  }

  async writer(locator: Locator, value: string): Promise<void> {
    console.log('Escribir en:', await locator.toString(), 'el valor:', value);
    await locator.fill(value);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
