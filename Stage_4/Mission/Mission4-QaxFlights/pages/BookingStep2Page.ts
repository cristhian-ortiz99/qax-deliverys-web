import { expect,Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class BookingStep2Page extends BasePage{

    readonly seatMap: Locator;
    readonly seatIndicator: Locator;
    readonly continueButton: Locator;

    constructor(page:Page){
        super(page);

        this.seatMap = page.locator('#seatMap');
        this.seatIndicator = page.locator('#seatIndicator');
        this.continueButton = page.locator('#continueBtn');
    }

    getSeat(seat: string) {
        return this.page.locator(`[data-seat="${seat}"]`);
    }

    async open(flightId: string, pax: number) {
        await this.navigate(`/booking-step2.html?flight=${flightId}&pax=${pax}`);
    }

    async selectSeat(seat: string) {
        await this.getSeat(seat).click();
    }

    async unselectSeat(seat: string) {
        await this.getSeat(seat).click();
    }

    async continueToBaggage() {
        await Promise.all([
        this.page.waitForURL(/booking-step3\.html/),
        this.continueButton.click()
        ]);
    }

    async validatePageLoaded() {
        await expect(this.seatMap).toBeVisible();
        await expect(this.continueButton).toBeVisible();
    }

    async validateSeatSelected(seat: string) {
        await expect(this.getSeat(seat)).toHaveClass(/selected/);
    }

    async validateSeatOccupied(seat: string) {
        await expect(this.getSeat(seat)).toHaveClass(/occupied/);
    }

    async validateSeatAvailable(seat: string) {
        await expect(this.getSeat(seat)).toHaveClass(/available/);
    }

    async validateIndicator(selected: number, total: number) {
        await expect(this.seatIndicator).toContainText(`${selected} / ${total}`);
    }

    async validateContinueButtonEnabled() {
        await expect(this.continueButton).toBeEnabled();
    }

    async validateContinueButtonDisabled() {
        await expect(this.continueButton).toBeDisabled();
    }

    async validateLocalStorage(expectedSeats: string[]) {
        const booking = await this.page.evaluate(() => {
            return JSON.parse(localStorage.getItem('qaxTravelBooking') || '{}');
        });
        expect(booking.selectedSeats).toEqual(expectedSeats);
    }

    async validateNavigationToStep3() {
        await expect(this.page).toHaveURL(/booking-step3.html/);
    }

}