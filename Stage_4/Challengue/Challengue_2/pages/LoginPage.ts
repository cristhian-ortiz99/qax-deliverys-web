import { BasePage } from './BasePage';
import type { Page, Locator } from '@playwright/test';

export class LoginPage extends BasePage {
  readonly txtEmail: Locator;
  readonly txtPassword: Locator;
  readonly btnLogin: Locator;

  constructor(page: Page) {
    super(page);
    this.txtEmail = page.locator('#loginEmail');
    this.txtPassword = page.locator('#loginPass');
    this.btnLogin = page.locator('button:has-text("Iniciar Sesión")');
  }

  async loginAs(email: string, password: string): Promise<void> {
    await this.writer(this.txtEmail, email);
    await this.writer(this.txtPassword, password);
    await this.doClick(this.btnLogin);
  }
}
