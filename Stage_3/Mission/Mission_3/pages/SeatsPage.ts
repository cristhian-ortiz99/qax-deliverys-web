import { expect, Locator, Page } from '@playwright/test'; 
import { BasePage } from './BasePage';

export class SeatsPage extends BasePage{

    readonly lblNombreEvento: Locator;
    readonly lblMetaEvento: Locator;

    readonly lblZonaPlatea: Locator;
    readonly lblZonaGeneral: Locator;

    readonly asientosLibres: Locator;
    readonly asientosOcupados: Locator;
    readonly asientosSeleccionados: Locator;

    readonly panelResumen: Locator;
    readonly listaAsientos: Locator;
    readonly lblTotal: Locator;

    readonly btnContinuarPago: Locator;
    readonly lblMaxWarning: Locator;

    constructor(page : Page){
        super(page);

        this.lblNombreEvento = page.locator('#evName');
        this.lblMetaEvento = page.locator('#evMeta');

        this.lblZonaPlatea = page.locator('.zone-divider').filter({ hasText: 'Platea' });
        this.lblZonaGeneral = page.locator('.zone-divider').filter({ hasText: 'General' });

        this.asientosLibres = page.locator('.seat.free');
        this.asientosOcupados = page.locator('.seat.occupied');
        this.asientosSeleccionados = page.locator('.seat.selected');

        this.panelResumen = page.locator('#floatPanel');
        this.listaAsientos = page.locator('#floatSeatsList');
        this.lblTotal = page.locator('#floatTotal');

        this.btnContinuarPago = page.locator('#btnContinue');
        this.lblMaxWarning = page.locator('#maxWarning');
    }

    async seleccionarAsientoLibre(indice: number): Promise<void> {
        await this.asientosLibres.nth(indice).click();
    }

    async seleccionarCuatroAsientos(): Promise<void> {
        for (let i = 0; i < 4; i++) {
            await this.asientosLibres.nth(i).click();
        }
    }

    async intentarSeleccionarQuintoAsiento(): Promise<void> {
        await this.asientosLibres.nth(4).click();
    }

    async continuarPago(): Promise<void> {
        await this.btnContinuarPago.click();
    }


    async validarEventoVisible(): Promise<void> {
        await expect(this.lblNombreEvento).toBeVisible();
        await expect(this.lblMetaEvento).toBeVisible();
    }

    async validarZonas(): Promise<void> {
        await expect(this.page.locator('.seat[data-zone="VIP"]').first()).toBeVisible();
        await expect(this.lblZonaPlatea).toBeVisible();
        await expect(this.lblZonaGeneral).toBeVisible();
    }

    async validarAsientosLibres(): Promise<void> {
        await expect(this.asientosLibres.first()).toBeVisible();
        const color = await this.asientosLibres.first().evaluate(el =>getComputedStyle(el).backgroundColor);
        expect(color).toBe('rgb(63, 185, 80)');
    }

    async validarAsientosOcupados(): Promise<void> {
        await expect(this.asientosOcupados.first()).toBeVisible();
        const color = await this.asientosOcupados.first().evaluate(el =>getComputedStyle(el).backgroundColor);
        expect(color).toBe('rgb(248, 81, 73)');
    }

    async validarAsientoSeleccionado(): Promise<void> {
    await expect(this.asientosSeleccionados).toHaveCount(1);
}

    async validarPanelResumen(): Promise<void> {
        await expect(this.panelResumen).toBeVisible();
        await expect(this.listaAsientos).not.toBeEmpty();
        await expect(this.lblTotal).toContainText('$');
    }

    async validarAdvertenciaMaxima(): Promise<void> {
        await expect(this.lblMaxWarning).toBeVisible();
    }

    async validarBotonContinuarDeshabilitado(): Promise<void> {
        await expect(this.btnContinuarPago).toBeDisabled();
    }

    async validarBotonContinuarHabilitado(): Promise<void> {
        await expect(this.btnContinuarPago).toBeEnabled();
    }

    async validarColorDisponible(): Promise<void> {
    const color = await this.asientosLibres.first().evaluate(el =>
        getComputedStyle(el).backgroundColor
    );
    expect(color).toBe('rgb(63, 185, 80)');
    }

    async validarColorOcupado(): Promise<void> {
    const color = await this.asientosOcupados.first().evaluate(el =>
        getComputedStyle(el).backgroundColor
    );
    expect(color).toBe('rgb(248, 81, 73)');
    }

    async validarColorSeleccionado(): Promise<void> {
    const color = await this.asientosSeleccionados.first().evaluate(el =>
        getComputedStyle(el).backgroundColor
    );
    expect(color).toBe('rgb(255, 215, 0)');
    }

    async validarCantidadAsientosSeleccionados(cantidad: number): Promise<void> {
        await expect(this.asientosSeleccionados).toHaveCount(cantidad);
    }
}