import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class MarketplacePage extends BasePage{

    private readonly btnAgregarCarrito: Locator;
    private readonly btnCarrito: Locator;

    constructor(page:Page){
        
        super(page);

        this.btnAgregarCarrito = page.getByRole('button', {name: 'Agregar al Carrito'});
        this.btnCarrito = page.getByRole('link', {name: /Carrito/});

    }

    async seleccionarProducto(nombreProducto: string) {
        await this.page.getByText(nombreProducto).click();
    }

    async agregarAlCarrito() {
        await this.btnAgregarCarrito.click();
    }

    async abrirCarrito() {
        await this.btnCarrito.click();
    }

    async validarProductoVisible(nombreProducto: string) {
        await expect(this.page.getByText(nombreProducto)).toBeVisible();
    }

}