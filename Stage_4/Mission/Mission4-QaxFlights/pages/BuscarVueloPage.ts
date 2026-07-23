import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class BuscarVueloPage extends BasePage{

    private readonly cboOrigin: Locator;
    private readonly cboDestination: Locator;
    private readonly txtDepartDate: Locator;
    private readonly cboAdults: Locator;
    private readonly btnSearch: Locator;

    private readonly summaryBanner: Locator;
    private readonly resultsArea: Locator;

    private readonly flightCards: Locator;
    private readonly airlineLabels: Locator;
    private readonly routeLabels: Locator;
    private readonly durationLabels: Locator;
    private readonly priceLabels: Locator;
    private readonly btnSelectFlight: Locator;

    private readonly filterChips: Locator;
    private readonly sortSelect: Locator;

    private readonly emptyState: Locator;

    constructor(page:Page){
        super (page);

        this.cboOrigin = page.locator('#origin');
        this.cboDestination = page.locator('#destination');
        this.txtDepartDate = page.locator('#depart');
        this.cboAdults = page.locator('#adults');

        this.btnSearch = page.locator('button[type="submit"]');

        this.summaryBanner = page.locator('#searchSummary');
        this.resultsArea = page.locator('#resultsArea');

        this.flightCards = page.locator('.flight-result-card');

        this.airlineLabels = page.locator('.flight-result-card .airline');
        this.routeLabels = page.locator('.flight-result-card .route');
        this.durationLabels = page.locator('.flight-result-card .meta');
        this.priceLabels = page.locator('.flight-price .amount');

        this.btnSelectFlight = page.locator('a:has-text("Seleccionar")');

        this.filterChips = page.locator('.filter-chip');

        this.sortSelect = page.locator('.sort-select');

        this.emptyState = page.locator('.empty-state');
    }


    async searchFlight(origin: string, destination: string, depart: string, adults: string){
        await this.cboOrigin.selectOption(origin);
        await this.cboDestination.selectOption(destination);
        await this.txtDepartDate.fill(depart);
        await this.cboAdults.selectOption(adults);
        await this.btnSearch.click();
    }

    async filterByAirline(airline: string) {
        await this.page.locator(`.filter-chip[data-airline="${airline}"]`).click();
    }

    async sortByPriceAsc() {
        await this.sortSelect.selectOption('price-asc');
    }

    async sortByPriceDesc() {
        await this.sortSelect.selectOption('price-desc');
    }

    async sortByDurationAsc() {
        await this.sortSelect.selectOption('duration-asc');
    }

    async selectFirstFlight() {
        await this.btnSelectFlight.first().click();
    }

    async validateSummary(origin: string, destination: string, depart: string, adults: string) {
        await expect(this.summaryBanner).toContainText(origin);
        await expect(this.summaryBanner).toContainText(destination);
        await expect(this.summaryBanner).toContainText(depart);
        await expect(this.summaryBanner).toContainText(adults);
    }

    async validateResultsDisplayed() {
        await expect(this.flightCards.first()).toBeVisible();
    }

    async validateNoResults() {
        await expect(this.emptyState).toContainText('No se encontraron vuelos');
    }
    async getDisplayedAirlines(){
        return await this.page.locator('.flight-result-card .airline').allTextContents();
    }

    async sortBy(value:string){
        await this.page.locator('.sort-select').selectOption(value);
    }

    async getAirlines() {
        return await this.airlineLabels.allTextContents();
    }

    async getPrices() {
        return await this.priceLabels.allTextContents();
    }

    async getRoutes() {
        return await this.routeLabels.allTextContents();
    }

    async getDurations() {
        return await this.durationLabels.allTextContents();
    }

    async getResultsCount() {
        return await this.flightCards.count();
    }
}