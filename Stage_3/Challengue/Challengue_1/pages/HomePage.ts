import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly products: Locator;
  readonly btnCart: Locator;
  readonly floatingCart: Locator;
  readonly btnCloseFloatingCart: Locator;
  readonly btnIrCarrito: Locator;

  constructor(page: Page) {
    super(page);
    this.products = page.locator('.product-card');
    this.btnCart = page.getByRole('link', {name: /🛒/i});
    this.floatingCart = page.locator('#floatingCart');
    this.btnCloseFloatingCart = this.floatingCart.locator('.cart-head button');
    this.btnIrCarrito = this.floatingCart.getByRole('button', {name: /Ir al Carrito/i });
  }

  async agregarProducto(position: number): Promise<void> {
    await this.products.nth(position).getByRole('button',{name: 'Agregar al carrito'}).click();
  }

  async validarCarritoFlotanteVisible(): Promise<boolean>{
    return await this.floatingCart.isVisible();
  }

  async cerrarCarritoFlotante(): Promise<void>{
    await this.btnCloseFloatingCart.click();
  }

  async irAlCarrito(): Promise<void> {
    await this.btnIrCarrito.click();
  }
}
