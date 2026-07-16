import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrderPage extends BasePage {

    readonly cboActivo: Locator;
    readonly cboTipoOrden: Locator;
    readonly cboLado: Locator;

    readonly txtCantidad: Locator;
    readonly txtPrecioLimite: Locator;

    readonly lblPrecioActual: Locator;

    readonly btnConfirmarOrden: Locator;
    readonly panelOrdenLimite: Locator;
    readonly panelOrdenStop: Locator;

    readonly modalConfirmacion: Locator;
    readonly lblIdOrden: Locator;
    readonly lblDetalleOrden: Locator;
    readonly btnEntendido: Locator;
    readonly lblOrderId: Locator;
    readonly grpPrecioLimite: Locator;

    constructor(page : Page){
        super(page);

        this.cboActivo = page.locator('#asset');
        this.cboTipoOrden = page.locator('#orderType');
        this.cboLado = page.locator('#side');

        this.txtCantidad = page.locator('#amount');
        this.grpPrecioLimite = page.locator('#limitPriceGroup');
        this.txtPrecioLimite = page.locator('#limitPrice');

        this.lblPrecioActual = page.locator('#currentPrice');

        this.btnConfirmarOrden = page.locator('#btnSubmit');

        this.panelOrdenLimite = page.locator('#limitFields');
        this.panelOrdenStop = page.locator('#stopFields');

        this.modalConfirmacion = page.locator('#confirmModal');
        this.lblIdOrden = page.locator('#modalOrderId');
        this.lblDetalleOrden = page.locator('#modalDetails');
        this.btnEntendido = page.getByRole('button', { name: 'Entendido' });
        this.lblOrderId = page.locator('#modalOrderId');
    }

    async seleccionarActivo(activo: string): Promise<void> {
        await this.cboActivo.selectOption(activo);
    }

    async seleccionarTipoOrden(tipo: 'market' | 'limit' | 'stop'): Promise<void> {
        await this.cboTipoOrden.selectOption(tipo);
    }

    async ingresarCantidad(cantidad: number): Promise<void> {
        await this.txtCantidad.fill(cantidad.toString());
    }

    async seleccionarLado(lado: 'buy' | 'sell'): Promise<void> {
        await this.cboLado.selectOption(lado);
    }

    async ingresarPrecioLimite(precio: number): Promise<void> {
        await this.txtPrecioLimite.fill(precio.toString());
    }

    async enviarOrden(): Promise<void> {
        await this.btnConfirmarOrden.click();
    }

    async cerrarModal(): Promise<void> {
        await this.btnEntendido.click();
    }

    async crearOrdenMarket(
        activo: string,
        cantidad: number,
        lado: 'buy' | 'sell'
    ): Promise<void> {

        await this.seleccionarActivo(activo);
        await this.seleccionarTipoOrden('market');
        await this.ingresarCantidad(cantidad);
        await this.seleccionarLado(lado);
        await this.enviarOrden();
    }


    async obtenerPrecioActual(): Promise<string> {
        return (await this.lblPrecioActual.textContent())?.trim() ?? '';
    }

    async obtenerIdOrden(): Promise<string> {
        return (await this.lblIdOrden.textContent())?.trim() ?? '';
    }

    async obtenerDetalleOrden(): Promise<string> {
        return (await this.lblDetalleOrden.textContent())?.trim() ?? '';
    }

    async validarPrecioActualVisible(): Promise<void> {
        await expect(this.lblPrecioActual).not.toHaveText('--');
    }

    async validarCamposMarket(): Promise<void> {
        await expect(this.panelOrdenLimite).not.toHaveClass(/show/);
        await expect(this.panelOrdenStop).not.toHaveClass(/show/);
        await expect(this.txtPrecioLimite).toBeHidden();
    }

    async validarCampoPrecioLimiteVisible(): Promise<void> {
        await expect(this.panelOrdenLimite).toHaveClass(/show/);
    }

    async validarBotonDeshabilitado(): Promise<void> {
        await expect(this.btnConfirmarOrden).toBeDisabled();
    }

    async validarModalVisible(): Promise<void> {
        await expect(this.modalConfirmacion).toHaveClass(/show/);
    }
    
    async validarOrderId(): Promise<void> {
        await expect(this.lblOrderId)
            .toContainText(/^ORD-[A-Z0-9]+$/);
    }

    async obtenerOrderId(): Promise<string> {
        return await this.lblOrderId.textContent() ?? '';
    }
}