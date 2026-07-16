import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {

    // Progress Bar
    readonly stepDireccion: Locator;
    readonly stepEnvio: Locator;
    readonly stepPago: Locator;
    readonly stepRevision: Locator;

    // Paso 1
    readonly txtNombre: Locator;
    readonly txtTelefono: Locator;
    readonly txtCalle: Locator;
    readonly txtCiudad: Locator;
    readonly txtDepartamento: Locator;
    readonly txtCodigoPostal: Locator;

    // Botones
    readonly btnContinuar: Locator;
    readonly btnAtras: Locator;
    readonly btnConfirmarPedido: Locator;

    // Paso 2
    readonly shippingOptions: Locator;

    // Paso 3
    readonly paymentOptions: Locator;

    // Paso 4
    readonly reviewSection: Locator;

    // Confirmación
    readonly successBox: Locator;
    readonly orderNumber: Locator;

    constructor(page: Page) {

        super(page);

        // Progress Bar
        this.stepDireccion = page.locator('[data-step="1"]');
        this.stepEnvio = page.locator('[data-step="2"]');
        this.stepPago = page.locator('[data-step="3"]');
        this.stepRevision = page.locator('[data-step="4"]');

        // Dirección
        this.txtNombre = page.locator('#cNombre');
        this.txtTelefono = page.locator('#cTelefono');
        this.txtCalle = page.locator('#cCalle');
        this.txtCiudad = page.locator('#cCiudad');
        this.txtDepartamento = page.locator('#cDepartamento');
        this.txtCodigoPostal = page.locator('#cCP');

        // Botones
        this.btnContinuar = page.getByRole('button', {name: /Continuar/i});
        this.btnAtras = page.getByRole('button', {name: /Atras/i});
        this.btnConfirmarPedido = page.getByRole('button', {name: /Confirmar Pedido/i});

        // Envío
        this.shippingOptions = page.locator('.shipping-option');

        // Pago
        this.paymentOptions = page.locator('.payment-option');

        // Revisión
        this.reviewSection = page.locator('#stepContent');

        // Confirmación
        this.successBox = page.locator('.success-box');
        this.orderNumber = page.locator('.success-box strong');
    }

    async completarDireccion() {
        await this.txtNombre.fill('Cristhian Ortiz');
        await this.txtTelefono.fill('987654321');
        await this.txtCalle.fill('Av. Arenales 123');
        await this.txtCiudad.fill('Lima');
        await this.txtDepartamento.fill('Lima');
        await this.txtCodigoPostal.fill('15011');
    }

    async continuar() {
        await this.btnContinuar.click();
    }

    async seleccionarMetodoEnvio(indice: number) {
        await this.shippingOptions.nth(indice).click();
    }

    async seleccionarMetodoPago(indice: number) {
        await this.paymentOptions.nth(indice).click();
    }

    async validarMetodoPagoSeleccionado(indice: number): Promise<boolean> {
    return await this.paymentOptions.nth(indice).evaluate(element => element.classList.contains('selected'));
    }

    async confirmarPedido() {
        await this.btnConfirmarPedido.click();
    }

    async obtenerNumeroOrden() {
        return await this.orderNumber.textContent();
    }

    async validarMetodoEnvioSeleccionado(indice: number): Promise<boolean> {
    return await this.shippingOptions.nth(indice).evaluate(element => element.classList.contains('selected'));
    }

    async validarTextoRevision(texto: string): Promise<boolean> {
    return await this.reviewSection.getByText(texto, { exact: false }).isVisible();
    }

    async obtenerNumeroOrdenValido(): Promise<string | null>{
    const order = await this.orderNumber.textContent();
    return order?.trim() ?? null;
    }
}