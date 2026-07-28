import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class BookingConfirmationPage extends BasePage{

    readonly bookingId: Locator;
    readonly flightDetails: Locator;
    readonly passengerDetails: Locator;
    readonly paymentDetails: Locator;
    readonly searchFlightsButton: Locator;
    readonly myTripsButton: Locator;

    constructor(page:Page){
        super(page);

        this.bookingId = page.locator('#bookingId');
        this.flightDetails = page.locator('#flightDetails');
        this.passengerDetails = page.locator('#passengerDetails');
        this.paymentDetails = page.locator('#paymentDetails');
        this.searchFlightsButton = page.getByRole('link', {name: 'Buscar más vuelos'});
        this.myTripsButton = page.getByRole('link', {name: 'Ver Mis Viajes'});
    }

    async validatePageLoaded() {
        await expect(this.page).toHaveURL(/booking-confirm/);
        await expect(this.bookingId).toBeVisible();
    }

    async validateBookingCode() {
        await expect(this.bookingId).toHaveText(/^QAX-TVL-.+/);
    }

    async validateFlightInformation() {
        await expect(this.flightDetails).toBeVisible();
    }

    async validateFlightContains(text: string) {
        await expect(this.flightDetails).toContainText(text);
    }

    async validatePassengerInformation() {
        await expect(this.passengerDetails).toBeVisible();
    }

    async validatePassenger(name: string) {
        await expect(this.passengerDetails).toContainText(name);
    }

    async validateSeat(seat: string) {
        await expect(this.passengerDetails).toContainText(seat);
    }

    async validatePaymentInformation() {
        await expect(this.paymentDetails).toBeVisible();
    }

    async validatePaymentMethod(method: string) {
        await expect(this.paymentDetails).toContainText(method);
    }

    async validateTotal(total: string) {
        await expect(this.paymentDetails).toContainText(total);
    }

    async getBookingId(): Promise<string> {
        const text = await this.bookingId.textContent();
        if (!text) {
            throw new Error('No se encontró el código de reserva.');
        }
        return text.trim();
    }
}