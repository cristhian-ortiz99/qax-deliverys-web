import { BasePage } from './BasePage';
import type { Page, Locator } from '@playwright/test';

export class UsersPage extends BasePage {
  readonly searchInput: Locator;
  readonly tableBody: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('#searchUser');
    this.tableBody = page.locator('#usersTableBody');
  }

  async searchUser(name: string): Promise<void> {
    await this.writer(this.searchInput, name);
  }

  async getUserRow(name: string): Promise<Locator> {
    return this.tableBody.locator(`tr:has-text("${name}")`);
  }

  async isUserInTable(name: string): Promise<boolean> {
    const row = await this.getUserRow(name);
    return row.isVisible();
  }

  async getStatusBadge(name: string): Promise<string> {
    const row = await this.getUserRow(name);
    const badge = row.locator('.badge');
    return (await badge.textContent()) || '';
  }
}
