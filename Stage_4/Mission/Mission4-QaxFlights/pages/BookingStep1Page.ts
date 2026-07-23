import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class BookingStep1Page extends BasePage{

    readonly flightSummary: Locator;
    readonly passengerForms: Locator;

    readonly errorMessage: Locator;

    readonly btnContinue: Locator;

    constructor(page:Page){
        super(page);

        this.flightSummary = page.locator('#flightSummary');
        this.passengerForms = page.locator('#passengerForms .card');

        this.errorMessage = page.locator('#errorMsg');

        this.btnContinue = page.getByRole('button', {name: 'Continuar a Selección de Asientos'});
    }

    async fillPassenger(
        index: number,
        passenger: {
            firstName: string;
            lastName: string;
            docType: string;
            docNumber: string;
            birthDate: string;
            nationality: string;
        }){
        await this.page.locator(`#firstName${index}`).fill(passenger.firstName);
        await this.page.locator(`#lastName${index}`).fill(passenger.lastName);
        await this.page.locator(`#docType${index}`).selectOption(passenger.docType);
        await this.page.locator(`#docNumber${index}`).fill(passenger.docNumber);
        await this.page.locator(`#birthDate${index}`).fill(passenger.birthDate);
        await this.page.locator(`#nationality${index}`).fill(passenger.nationality);
    }

    async openBooking(flightId: string, passengers: number) {
        await this.navigate(`/booking-step1.html?flight=${flightId}&pax=${passengers}`);
    }
    
    async clickContinue() {
        await this.btnContinue.click();
    }

    async validateSummary() {
        await expect(this.flightSummary).toBeVisible();
    }

    async validatePassengerForms(expected: number) {
        await expect(this.passengerForms).toHaveCount(expected);
    }

    async validateRequiredMessage() {
        await expect(this.errorMessage).toContainText(
            'Todos los campos obligatorios deben estar llenos.'
        );
    }

    async validateRedirect() {
        await expect(this.page).toHaveURL(/booking-step2/);
    }

    async getBookingLocalStorage() {
        return await this.page.evaluate(() => {
            return JSON.parse(localStorage.getItem('qaxTravelBooking') || '{}');
        });
    }

}