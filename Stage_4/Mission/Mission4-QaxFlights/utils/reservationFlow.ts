import { APIRequestContext, Page } from '@playwright/test';

import { FlightsApi } from '../apis/FlightsApis';

import { BuscarVueloPage } from '../pages/BuscarVueloPage';
import { BookingStep1Page } from '../pages/BookingStep1Page';
import { BookingStep2Page } from '../pages/BookingStep2Page';
import { BookingStep3Page } from '../pages/BookingStep3Page';
import { BookingStep4Page } from '../pages/BookingStep4Page';
import { BookingConfirmationPage } from '../pages/BookingConfirmationPage';


export interface ReservationResult{
    bookingId: string;
    flight: any;
    passengers: any[];
    selectedSeats: string[];
    baggage: string[];
    total: number;
}

export class ReservationFlow {

    static async createReservation(page: Page,request: APIRequestContext): Promise<ReservationResult> {

        const flightsApi = new FlightsApi(request);

        const buscarVueloPage = new BuscarVueloPage(page);
        const bookingStep1Page = new BookingStep1Page(page);
        const bookingStep2Page = new BookingStep2Page(page);
        const bookingStep3Page = new BookingStep3Page(page);
        const bookingStep4Page = new BookingStep4Page(page);
        const bookingConfirmPage = new BookingConfirmationPage(page);


        const result = await flightsApi.getAll();
        const flight = result.body[0];

        const passengers = [
            {
                firstName: 'Cristhian',
                lastName: 'Ortiz',
                docType: 'CC',
                docNumber: '12345678',
                birthDate: '1995-05-20',
                nationality: 'Peruana'
            }
        ];

        const selectedSeats = ['2C'];

        const baggage = ['checked'];

        //-------------------------------------------------
        // HU01
        //-------------------------------------------------

        await buscarVueloPage.navigate();

        await buscarVueloPage.searchFlight(
            flight.origin,
            flight.destination,
            flight.departDate,
            '1'
        );

        await buscarVueloPage.selectFirstFlight();

        //-------------------------------------------------
        // HU02
        //-------------------------------------------------

        await bookingStep1Page.fillPassenger(
            1,
            passengers[0]
        );

        await bookingStep1Page.clickContinue();

        //-------------------------------------------------
        // HU03
        //-------------------------------------------------

        await bookingStep2Page.selectSeat(
            selectedSeats[0]
        );

        await bookingStep2Page.continueToBaggage();

        //-------------------------------------------------
        // HU04
        //-------------------------------------------------

        await bookingStep3Page.selectBaggage(
            baggage[0]
        );

        await bookingStep3Page.continueToPayment();

        //-------------------------------------------------
        // HU05
        //-------------------------------------------------

        await bookingStep4Page.selectCreditCard();

        await bookingStep4Page.fillCardInformation(
            '4111111111111111',
            '12/30',
            '123',
            'CRISTHIAN ORTIZ'
        );
        const total = await bookingStep4Page.getTotal();
        await bookingStep4Page.clickPay();

        //-------------------------------------------------
        // Confirmación
        //-------------------------------------------------

        const bookingId = await bookingConfirmPage.getBookingId();

        return {
            bookingId,
            flight,
            passengers,
            selectedSeats,
            baggage,
            total
        };

    }

}
