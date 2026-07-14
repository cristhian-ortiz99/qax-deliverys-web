import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly stockStatus: Locator;
  readonly addToCartBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator('.product-title');
    this.productPrice = page.locator('.price');
    this.stockStatus = page.locator('.stock');
    this.addToCartBtn = page.getByRole('button', { name: /carrito/i });
  }

  async addToCart(): Promise<void> {
    await this.addToCartBtn.click();
  }
}
