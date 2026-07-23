import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage{

    private readonly btnIrPagar: Locator;

    constructor(page:Page){
        super(page);

        this.btnIrPagar = page.getByRole('link', {name: 'Ir a Pagar'});

    }

    async continuarCheckout() {
        await this.btnIrPagar.click();
    }

    async validarBotonPagar() {
        await expect(this.btnIrPagar).toBeVisible();
    }

}