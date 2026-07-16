import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PortafolioPage extends BasePage{

    readonly tablaHoldings: Locator;
    readonly filasHoldings: Locator;

    readonly pieChart: Locator;
    readonly pieLegend: Locator;

    readonly emptyState: Locator;

    constructor(page: Page) {
        super(page);

        this.tablaHoldings = page.locator('#holdingsWrap');
        this.filasHoldings = page.locator('#holdingsBody tr');

        this.pieChart = page.locator('#pieChart');
        this.pieLegend = page.locator('#pieLegend');

        this.emptyState = page.locator('#emptyState');
    }
    
    async validarTablaVisible(): Promise<void> {
        await expect(this.tablaHoldings).toBeVisible();
    }

    async validarHoldings(): Promise<void> {
        await expect(this.filasHoldings.first()).toBeVisible();
    }

    async validarColumnas(): Promise<void> {
        const primeraFila = this.filasHoldings.first();
        await expect(primeraFila.locator('td').nth(1)).not.toBeEmpty(); // Cantidad
        await expect(primeraFila.locator('td').nth(2)).not.toBeEmpty(); // Precio promedio
        await expect(primeraFila.locator('td').nth(4)).not.toBeEmpty(); // Valor total
    }

    async validarColorPL(): Promise<void> {
        const pl = this.filasHoldings.first().locator('.pnl');
        const clase = await pl.getAttribute('class');
        expect(clase).toMatch(/up|down/);
    }

    async validarPieChart(): Promise<void> {
        await expect(this.pieChart).toBeVisible();
        const background = await this.pieChart.evaluate(el => window.getComputedStyle(el).backgroundImage);
        expect(background).toContain('conic-gradient');
    }

    async validarLeyendaPie(): Promise<void> {
        await expect(this.pieLegend.locator('.legend-item').first()).toBeVisible();
    }

    async validarEstadoVacio(): Promise<void> {
        await expect(this.emptyState).toBeVisible();
        await expect(this.emptyState).toContainText('No tienes posiciones abiertas');
    }

    async limpiarHoldings(): Promise<void> {
    await this.page.evaluate(() => {
        localStorage.setItem('qaxtrade_portfolio',JSON.stringify([]));
    });
}
}