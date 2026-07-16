import { expect, Locator, Page, FrameLocator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {

    private readonly txtNombre: Locator;
    private readonly txtCorreo: Locator;
    private readonly txtTelefono: Locator;

    private readonly lblEvento: Locator;
    private readonly lblLugar: Locator;
    private readonly lblFecha: Locator;
    private readonly lblTotal: Locator;

    private readonly paymentFrame: FrameLocator;

    private readonly lblMontoPago: Locator;
    private readonly txtNumeroTarjeta: Locator;
    private readonly txtFechaVencimiento: Locator;
    private readonly txtCVV: Locator;
    private readonly txtTitular: Locator;
    private readonly btnPagar: Locator;
    private readonly lblEstadoPago: Locator;


    constructor (page: Page){
        
        super(page);

        this.txtNombre = page.locator('#buyerName');
        this.txtCorreo = page.locator('#buyerEmail');
        this.txtTelefono = page.locator('#buyerPhone');

        this.lblEvento = page.locator('#orderSummaryContent .summary-item').nth(0);
        this.lblLugar = page.locator('#orderSummaryContent .summary-item').nth(1);
        this.lblFecha = page.locator('#orderSummaryContent .summary-item').nth(2);
        this.lblTotal = page.locator('.summary-total');

        this.paymentFrame = page.frameLocator('#paymentIframe');

        this.lblMontoPago = this.paymentFrame.locator('#payAmount');
        this.txtNumeroTarjeta = this.paymentFrame.locator('#cardNumber');
        this.txtFechaVencimiento = this.paymentFrame.locator('#expiry');
        this.txtCVV = this.paymentFrame.locator('#cvv');
        this.txtTitular = this.paymentFrame.locator('#cardName');
        this.btnPagar = this.paymentFrame.locator('#btnPay');
        this.lblEstadoPago = this.paymentFrame.locator('#statusMsg');
    }

    async completarDatosComprador(nombre: string, correo: string, telefono: string): Promise<void> {
        await this.txtNombre.fill(nombre);
        await this.txtCorreo.fill(correo);
        await this.txtTelefono.fill(telefono);
    }

    async completarDatosTarjeta(numero: string, fecha: string, cvv: string, titular: string): Promise<void> {
        await this.txtNumeroTarjeta.fill(numero);
        await this.txtFechaVencimiento.fill(fecha);
        await this.txtCVV.fill(cvv);
        await this.txtTitular.fill(titular);
    }

    async realizarPago(): Promise<void> {
        await this.btnPagar.click();
    }


    async validarFormularioComprador(): Promise<void> {
        await expect(this.txtNombre).toBeVisible();
        await expect(this.txtCorreo).toBeVisible();
        await expect(this.txtTelefono).toBeVisible();
    }

    async validarResumenCompra(): Promise<void> {
        await expect(this.lblEvento).toBeVisible();
        await expect(this.lblLugar).toBeVisible();
        await expect(this.lblFecha).toBeVisible();
        await expect(this.lblTotal).toBeVisible();
    }

    async validarIframeVisible(): Promise<void> {
        await expect(this.lblMontoPago).toBeVisible();
    }

    async validarFormularioTarjeta(): Promise<void> {
        await expect(this.txtNumeroTarjeta).toBeVisible();
        await expect(this.txtFechaVencimiento).toBeVisible();
        await expect(this.txtCVV).toBeVisible();
        await expect(this.txtTitular).toBeVisible();
    }

    async validarPagoProcesando(): Promise<void> {
        await expect(this.lblEstadoPago).toContainText('Procesando');
    }

    async validarPagoExitoso(): Promise<void> {
        await expect(this.lblEstadoPago).toContainText('Pago exitoso');
    }

    async validarRedireccionTickets(): Promise<void> {
        await expect(this.page).toHaveURL(/tickets\.html/);
    }

}