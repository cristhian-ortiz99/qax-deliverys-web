import { BasePage } from './BasePage';
import type { Page, Locator } from '@playwright/test';

export class ProductsPage extends BasePage {
  readonly searchInput: Locator;
  readonly tableBody: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('#searchProd');
    this.tableBody = page.locator('#productsTableBody');
  }

  async searchProduct(name: string): Promise<void> {
    await this.writer(this.searchInput, name);
  }

  async getProductRow(name: string): Promise<Locator> {
    return this.tableBody.locator(`tr:has-text("${name}")`);
  }

  async isProductInTable(name: string): Promise<boolean> {
    const row = await this.getProductRow(name);
    return row.isVisible();
  }

  async getPriceForProduct(name: string): Promise<string> {
    const row = await this.getProductRow(name);
    return (await row.locator('td').nth(3).textContent()) || '';
  }
}
