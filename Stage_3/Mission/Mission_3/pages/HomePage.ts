import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage{

    private readonly btnFiltroTodos: Locator;
    private readonly btnFiltroConciertos: Locator;
    private readonly btnFiltroFutbol: Locator;
    private readonly btnFiltroTeatro: Locator;
    private readonly btnFiltroFestivales: Locator;

    private readonly cardsEventos: Locator;

    private readonly lblTituloEvento: Locator;
    private readonly lblFechaEvento: Locator;
    private readonly lblLugarEvento: Locator;
    private readonly lblPrecioEvento: Locator;

    private readonly btnComprarEntradas: Locator;

    constructor (page : Page){
        super(page);

        this.btnFiltroTodos = page.getByRole('button', { name: 'Todos' });
        this.btnFiltroConciertos = page.getByRole('button', { name: 'Conciertos' });
        this.btnFiltroFutbol = page.getByRole('button', { name: 'Futbol' });
        this.btnFiltroTeatro = page.getByRole('button', { name: 'Teatro' });
        this.btnFiltroFestivales = page.getByRole('button', { name: 'Festivales' });

        this.cardsEventos = page.locator('.event-card');

        this.lblTituloEvento = page.locator('.event-card .title');
        this.lblFechaEvento = page.locator('.event-card .date');
        this.lblLugarEvento = page.locator('.event-card .venue');
        this.lblPrecioEvento = page.locator('.event-card .price');

        this.btnComprarEntradas = page.locator('.btn-buy');
    }

    async filtrarFutbol(): Promise<void> {
        await this.btnFiltroFutbol.click();
    }

    async comprarPrimerEvento(): Promise<void> {
        await this.btnComprarEntradas.first().click();
    }


    async validarCantidadEventos(): Promise<void> {
        await expect(this.cardsEventos).toHaveCount(6);
    }

    async validarInformacionEventos(): Promise<void> {
        const cantidad = await this.cardsEventos.count();
        for (let i = 0; i < cantidad; i++) {
            await expect(this.lblTituloEvento.nth(i)).not.toBeEmpty();
            await expect(this.lblFechaEvento.nth(i)).not.toBeEmpty();
            await expect(this.lblLugarEvento.nth(i)).not.toBeEmpty();
            await expect(this.lblPrecioEvento.nth(i)).not.toBeEmpty();
        }
    }

    async validarSoloEventosFutbol(): Promise<void> {
        const cantidad = await this.cardsEventos.count();
        for (let i = 0; i < cantidad; i++) {
            await expect(this.cardsEventos.nth(i)).toHaveAttribute('data-category', 'futbol');
        }
    }

    async validarFiltroActivo(): Promise<void> {
        await expect(this.btnFiltroFutbol).toHaveClass(/active/);
    }

    async validarNavegacionAsientos(): Promise<void> {
        await expect(this.page).toHaveURL(/seats\.html/);
    }
}