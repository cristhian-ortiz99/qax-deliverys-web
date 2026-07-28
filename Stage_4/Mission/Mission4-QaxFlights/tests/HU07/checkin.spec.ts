import { test, expect } from '@playwright/test';
import { BookingsApi } from '../../apis/BookingsApi';
import { CheckinPage } from '../../pages/CheckinPage';

test.describe('HU07 - Web Check-in y cambio de asiento', () => {

    test('CP - Consultar una reserva existente', async ({ page, request }) => {
        const bookingsApi = new BookingsApi(request);
        const checkinPage = new CheckinPage(page);

        let booking: any;

        await test.step('Given: Existe una reserva registrada', async () => {
            const result = await bookingsApi.getAll();
            expect(result.response.status()).toBe(200);
            booking = result.body[0];
            expect(booking).toBeDefined();
        });

        await test.step('When: El usuario ingresa a la página de Check-in', async () => {
            await checkinPage.open();
            await checkinPage.validatePageLoaded();
        });

        await test.step('And: Busca la reserva utilizando el código y apellido', async () => {
            await checkinPage.searchBooking(
                booking.id,
                booking.passengers[0].lastName
            );
        });

        await test.step('Then: Se muestra la información del vuelo', async () => {
            await checkinPage.validateBookingLoaded();
            await checkinPage.validateFlightInformation(booking);
        });

        await test.step('And: Se muestran los pasajeros de la reserva', async () => {
            await checkinPage.validatePassengers(booking);
        });

    });

    test('CP - Cambiar asiento del pasajero', async ({ page, request }) => {

        const bookingsApi = new BookingsApi(request);
        const checkinPage = new CheckinPage(page);

        let booking: any;
        let newSeat: string;

        await test.step('Given: Existe una reserva registrada', async () => {
            const result = await bookingsApi.getAll();
            expect(result.response.status()).toBe(200);
            booking = result.body[0];
            expect(booking).toBeDefined();
        });

        await test.step('When: El usuario consulta la reserva', async () => {
            await checkinPage.open();
            await checkinPage.searchBooking(
                booking.id,
                booking.passengers[0].lastName
            );
            await checkinPage.validateBookingLoaded();
        });

        await test.step('And: Selecciona un pasajero', async () => {
            await checkinPage.selectPassenger(0);
        });

        await test.step('And: Selecciona un nuevo asiento disponible', async () => {
            newSeat = await checkinPage.selectFirstAvailableSeat();
        });

        await test.step('And: Confirma el cambio de asiento', async () => {
            await checkinPage.clickChangeSeat();
        });

        await test.step('Then: El asiento se actualiza correctamente', async () => {
            await checkinPage.validateSeatChanged(newSeat);
        });

        await test.step('And: Se muestra el mensaje de confirmación', async () => {
            await checkinPage.validateSeatChangeMessage();
        });

    });

    test('CP - Visualizar Boarding Pass', async ({ page, request }) => {

        const bookingsApi = new BookingsApi(request);
        const checkinPage = new CheckinPage(page);

        let booking: any;

        await test.step('Given: Existe una reserva registrada', async () => {
            const result = await bookingsApi.getAll();
            expect(result.response.status()).toBe(200);
            booking = result.body[0];
            expect(booking).toBeDefined();
        });

        await test.step('When: El usuario consulta la reserva', async () => {
            await checkinPage.open();
            await checkinPage.searchBooking(
                booking.id,
                booking.passengers[0].lastName
            );
        });

        await test.step('Then: Se visualiza el Boarding Pass', async () => {
            await checkinPage.validateBoardingPass();
        });

        await test.step('And: Se muestran los pasajeros y sus asientos', async () => {
            await checkinPage.validateBoardingPassengers(booking);
        });

        await test.step('And: Se muestra el código QR', async () => {
            await checkinPage.validateQRCode();
        });

    });

});