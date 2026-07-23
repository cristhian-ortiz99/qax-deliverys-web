import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrderProductsPage extends BasePage{

    private readonly tituloOrdenes: Locator;

    constructor(page:Page){
        super(page);

        this.tituloOrdenes = page.getByRole('heading', {name: 'Órdenes Recibidas'});
    }

    async validarPaginaOrdenes() {
        await expect(this.tituloOrdenes).toBeVisible();
    }
}