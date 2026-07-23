import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TripsPage extends BasePage{

    readonly upcomingTab: Locator;
    readonly pastTab: Locator;

    readonly tripCards: Locator;
    readonly emptyState: Locator;

    readonly eticketButton: Locator;


    constructor(page:Page) {
        super(page);

        this.upcomingTab = page.getByRole('button', { name: 'Próximos' });
        this.pastTab = page.getByRole('button', { name: 'Pasados' });

        this.tripCards = page.locator('.trip-card');
        this.emptyState = page.locator('.empty-state');

        this.eticketButton = page.getByRole('link', { name: 'Ver E-Ticket' });
        
    }

    async open() {
        await this.navigate('/trips.html');
    }

    async clickUpcoming() {
        await this.upcomingTab.click();
    }

    async clickPast() {
        await this.pastTab.click();
    }

    async validatePageLoaded() {
        await expect(this.page).toHaveURL(/trips\.html/);
        await expect(this.upcomingTab).toBeVisible();
        await expect(this.pastTab).toBeVisible();
    }

    async validateTripsExist() {
        await expect(this.tripCards.first()).toBeVisible();
    }

    async validateTripsCount(expected: number) {
        await expect(this.tripCards).toHaveCount(expected);
    }

    async validateTripInformation(
        airline: string,
        origin: string,
        destination: string,
        bookingId: string,
        status: string
    ) {
        const card = this.tripCards.filter({hasText: bookingId});
        await expect(card).toContainText(airline);
        await expect(card).toContainText(`${origin} → ${destination}`);
        await expect(card).toContainText(status);
    }

    async clickEticket(index: number = 0) {
        await this.eticketButton.nth(index).click();
    }

    async validateNavigationToBooking(id: string) {
        await expect(this.page).toHaveURL(
            new RegExp(`booking-confirm\\.html\\?id=${id}`)
        );
    }

    async validateEmptyState(expectedMessage: string) {
        await expect(this.emptyState).toBeVisible();
        await expect(this.emptyState).toContainText(expectedMessage);
    }

    async validateUpcomingTabActive() {
        await expect(this.upcomingTab).toHaveClass(/active/);
    }

    async validatePastTabActive() {
        await expect(this.pastTab).toHaveClass(/active/);
    }

    async getTripsCount(): Promise<number> {
        return await this.tripCards.count();
    }
}