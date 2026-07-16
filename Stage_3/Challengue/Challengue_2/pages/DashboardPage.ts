import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage{

    readonly txtValorPortafolio: Locator;
    readonly txtPnLDiario: Locator;
    readonly txtEfectivoDisponible: Locator;
    readonly txtTotalInvertido: Locator;

    readonly tablaWatchlist: Locator;
    readonly filasWatchlist: Locator;
    readonly celdasCambio: Locator;

    readonly graficoVelas: Locator;
    readonly velas: Locator;

    constructor (page: Page){
        super(page);

        this.txtValorPortafolio = page.locator('#portValue');
        this.txtPnLDiario = page.locator('#dailyPnL');
        this.txtEfectivoDisponible = page.locator('#cashBal');
        this.txtTotalInvertido = page.locator('#invested');

        this.tablaWatchlist = page.locator('.watchlist table');
        this.filasWatchlist = page.locator('#watchlistBody tr');
        this.celdasCambio = page.locator('#watchlistBody td.change');

        this.graficoVelas = page.locator('#candleChart');
        this.velas = page.locator('.candle');
    }

    async esperarActualizacionDashboard(): Promise<void> {
        await this.page.waitForTimeout(5000);
    }

    async validarResumenPortafolio(): Promise<void> {
        await expect(this.txtValorPortafolio).toBeVisible();
        await expect(this.txtPnLDiario).toBeVisible();
        await expect(this.txtEfectivoDisponible).toBeVisible();
        await expect(this.txtTotalInvertido).toBeVisible();
    }

    async validarWatchlistVisible(): Promise<void> {
        await expect(this.tablaWatchlist).toBeVisible();
    }

    async validarCantidadActivos(cantidadEsperada: number): Promise<void> {
        await expect(this.filasWatchlist).toHaveCount(cantidadEsperada);
    }

    async validarGraficoVelasVisible(): Promise<void> {
        await expect(this.graficoVelas).toBeVisible();
    }

    async validarCantidadVelas(cantidadEsperada: number): Promise<void> {
        await expect(this.velas).toHaveCount(cantidadEsperada);
    }

    async validarColoresCambioPrecio(): Promise<void> {
        const totalCambios = await this.celdasCambio.count();
        for (let i = 0; i < totalCambios; i++) {
            const clase = await this.celdasCambio.nth(i).getAttribute('class');
            expect(clase?.includes('up') || clase?.includes('down')).toBeTruthy();
        }
    }

}