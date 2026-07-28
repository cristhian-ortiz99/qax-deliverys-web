import { Locator, Page} from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage{
    
    private readonly btnComprador: Locator;
    private readonly btnVendedor: Locator;

    constructor(page: Page){
        super(page);

        this.btnComprador = this.page.locator('.role-card', {hasText: 'Soy Comprador'});
        this.btnVendedor = this.page.locator('.role-card', {hasText: 'Soy Vendedor'});
    }

    async ingresarComoComprador() {
        await this.btnComprador.click();
    }

    async ingresarComoVendedor() {
        await this.btnVendedor.click();
    }
}