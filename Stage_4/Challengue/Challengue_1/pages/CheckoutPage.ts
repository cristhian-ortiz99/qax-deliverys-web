import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage{

    private readonly txtNombre: Locator;
    private readonly txtDireccion: Locator;
    private readonly txtTelefono: Locator;
    private readonly cmbCiudad: Locator;

    private readonly txtNumeroTarjeta: Locator;
    private readonly txtVencimiento: Locator;
    private readonly txtCVV: Locator;

    private readonly btnContinuarPago: Locator;
    private readonly btnConfirmarPedido: Locator;

    constructor(page:Page){
        super(page);

        this.txtNombre = page.getByRole('textbox', {name: 'Nombre Completo'});
        this.txtDireccion = page.getByRole('textbox', {name: 'Dirección'});
        this.txtTelefono = page.getByRole('textbox', {name: 'Teléfono'});
        this.cmbCiudad = page.getByLabel('Ciudad');

        this.txtNumeroTarjeta = page.getByRole('textbox', {name: 'Número de Tarjeta'});
        this.txtVencimiento = page.getByRole('textbox', {name: 'Vencimiento'});
        this.txtCVV = page.getByRole('textbox', {name: 'CVV'});

        this.btnContinuarPago = page.getByRole('button', {name: 'Continuar al Pago'});
        this.btnConfirmarPedido = page.getByRole('button', {name: 'Confirmar Pedido'});
    }

    async ingresarNombre(nombre: string) {
        await this.txtNombre.fill(nombre);
    }

    async ingresarDireccion(direccion: string) {
        await this.txtDireccion.fill(direccion);
    }

    async ingresarTelefono(telefono: string) {
        await this.txtTelefono.fill(telefono);
    }

    async seleccionarCiudad(ciudad: string) {
        await this.cmbCiudad.selectOption(ciudad);
    }

    async continuarPago() {
        await this.btnContinuarPago.click();
    }

    async ingresarNumeroTarjeta(numero: string) {
        await this.txtNumeroTarjeta.fill(numero);
    }

    async ingresarVencimiento(fecha: string) {
        await this.txtVencimiento.fill(fecha);
    }

    async ingresarCVV(cvv: string) {
        await this.txtCVV.fill(cvv);
    }

    async confirmarPedido() {
        await this.btnConfirmarPedido.click();
    }

    async validarFormularioEnvio() {
        await expect(this.txtNombre).toBeVisible();
        await expect(this.txtDireccion).toBeVisible();
        await expect(this.txtTelefono).toBeVisible();
    }

    async validarFormularioPago() {
        await expect(this.txtNumeroTarjeta).toBeVisible();
        await expect(this.txtVencimiento).toBeVisible();
        await expect(this.txtCVV).toBeVisible();
    }


}