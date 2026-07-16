import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {

    readonly cartItems: Locator;
    readonly firstCartItem: Locator;
    readonly productTitle: Locator;
    readonly productPrice: Locator;
    readonly quantityInput: Locator;
    readonly btnIncreaseQty: Locator;
    readonly btnDecreaseQty: Locator;
    readonly subtotal: Locator;
    readonly btnCheckout: Locator;

    constructor(page: Page){
        super(page);

        this.cartItems = page.locator('.cart-item');
        this.firstCartItem = this.cartItems.first();
        this.productTitle = this.firstCartItem.locator('.item-title');
        this.productPrice = this.firstCartItem.locator('.item-price');
        this.quantityInput = this.firstCartItem.locator('.qty-control input');

        this.btnIncreaseQty = this.firstCartItem.locator('.qty-control button').last();
        this.btnDecreaseQty = this.firstCartItem.locator('.qty-control button').first();

        this.subtotal = this.firstCartItem.locator('.item-subtotal .st');
        this.btnCheckout = page.getByRole('link', {name: /Proceder al Pago/i});
    }

    async aumentarCantidad(): Promise<void>{
        await this.btnIncreaseQty.click();
    };

    async disminuirCantidad(): Promise<void>{
        await this.btnDecreaseQty.click();
    }
    
    async modificarCantidad(cantidad: string): Promise<void>{
        await this.quantityInput.fill(cantidad);
    }

    async obtenerSubtotal(){
        return await this.subtotal.textContent();
    }

    async irCheckout(){
        await this.btnCheckout.click();
    }
}