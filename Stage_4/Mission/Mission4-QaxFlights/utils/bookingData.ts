import { APIRequestContext, expect, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { FlightsApi } from '../apis/FlightsApis';

export class BookingUtils {

    static async getAvailableFlight(request: APIRequestContext) {

        const flightsApi = new FlightsApi(request);
        const result = await flightsApi.getAll();
        expect(result.res.status()).toBe(200);
        expect(result.body.length).toBeGreaterThan(0);
        return result.body[0];
    }

    static buildPassengers(pax: number) {

        return Array.from({ length: pax }, (_, index) => ({
            id: `pax${index + 1}`,
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            docType: 'CC',
            docNumber: faker.string.numeric(10),
            birthDate: '1995-01-01',
            nationality: 'Colombiana'
        }));

    }

    static async prepareBooking(page: Page, booking: Record<string, unknown>) {
        await page.addInitScript((bookingData) => {
            localStorage.setItem('qaxTravelBooking',JSON.stringify(bookingData));
        }, booking);
    }

    static async prepareBookingData(page: Page, flightId: string, pax: number, selectedSeats: string[] = [], baggage: string[] = []) {
        const booking = {
            flightId,
            pax,
            passengers: this.buildPassengers(pax),
            selectedSeats,
            baggage
        };
        await this.prepareBooking(page, booking);
    }

}