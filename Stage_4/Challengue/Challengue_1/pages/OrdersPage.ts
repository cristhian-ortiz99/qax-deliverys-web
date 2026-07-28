import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class OrdersPage extends BasePage {

    private readonly lblPedido: Locator;

    constructor(page: Page) {
        super(page);

        this.lblPedido = page.locator('.order-card');
    }

    async validarPedido(nombre: string, direccion: string) {
    await expect(this.page.getByText(`${nombre} — ${direccion}`)).toBeVisible();
}

    async validarListadoPedidos() {
        await expect(this.lblPedido.first()).toBeVisible();
    }

}