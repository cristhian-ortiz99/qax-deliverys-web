import { test, expect } from '@playwright/test';

import { ReservationFlow } from '../../utils/reservationFlow';
import { BookingsApi } from '../../apis/BookingsApi';
import { FlightsApi } from '../../apis/FlightsApis';

test.describe('HU08 - Validación post-reserva vía API', () => {

    test('CP - Validar persistencia de la reserva en backend', async ({ page, request }) => {

        const bookingsApi = new BookingsApi(request);
        const flightsApi = new FlightsApi(request);

        let reservation: any;
        let booking: any;
        let flight: any;

        await test.step('Given: El usuario completa exitosamente una reserva desde la UI', async () => {
            reservation = await ReservationFlow.createReservation(
                page,
                request
            );
            expect(reservation.bookingId).toMatch(/^QAX-TVL-\d+$/);

        });

        await test.step('When: Se consulta la reserva mediante la API', async () => {
            const response = await bookingsApi.getById(
                reservation.bookingId
            );
            expect(response.response.status()).toBe(200);
            booking = response.body;

        });

        await test.step('Then: El flightId corresponde al vuelo seleccionado', async () => {
            expect(booking.flightId).toBe(reservation.flight.id);
        });

        await test.step('And: Los pasajeros coinciden con los ingresados en UI', async () => {
            expect(booking.passengers.map((p: any) => ({
                firstName: p.firstName,
                lastName: p.lastName,
                docType: p.docType,
                docNumber: p.docNumber,
                birthDate: p.birthDate,
                nationality: p.nationality
            }))).toEqual(reservation.passengers);
        });

        await test.step('And: Los asientos coinciden con los seleccionados', async () => {
            expect(booking.selectedSeats).toEqual(reservation.selectedSeats);
        });

        await test.step('And: El total coincide con el mostrado en la UI', async () => {
            expect(booking.totalPrice).toBe(reservation.total);
        });

        await test.step('And: El estado de la reserva es Confirmed', async () => {
            expect(booking.status).toBe('confirmed');
        });

        await test.step('When: Se consulta el vuelo mediante la API', async () => {
            const response = await flightsApi.getById(reservation.flight.id);
            expect(response.response.status()).toBe(200);
            flight = response.body;
        });

        await test.step('Then: Los asientos seleccionados aparecen ocupados', async () => {
            for (const seat of reservation.selectedSeats) {
                expect(flight.occupiedSeats).toContain(seat);
            }

        });

    });

});