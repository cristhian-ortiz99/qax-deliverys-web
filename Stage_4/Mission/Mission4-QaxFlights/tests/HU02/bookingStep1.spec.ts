import { test, expect } from '@playwright/test';
import { FlightsApi } from '../../apis/FlightsApis';
import { BookingStep1Page } from '../../pages/BookingStep1Page';
import { PassengerData } from '../../utils/passengerData';

test.describe('HU02 - Ingresar datos de pasajeros', () => {

    test('CP0 - Registrar correctamente los datos de pasajeros', async ({ page, request }) => {

        const flightsApi = new FlightsApi(request);
        const bookingPage = new BookingStep1Page(page);

        let flight: any;
        let passenger: any
        await test.step('Given: Existe un vuelo disponible', async () => {

            const result = await flightsApi.getAll();
            expect(result.res.status()).toBe(200);
            flight = result.body[0];
        });

        await test.step('When: El usuario abre el formulario de pasajeros', async () => {
            await bookingPage.openBooking(
                flight.id,
                1
            );
        });

        await test.step('And: Completa todos los datos del pasajero', async () => {
            passenger = PassengerData.getPassenger();
            await bookingPage.fillPassenger(1, passenger);
            await bookingPage.clickContinue();
        });

        await test.step('Then: La información se guarda en localStorage', async () => {
            
            const booking = await bookingPage.getBookingLocalStorage();

            expect(booking.flightId).toBe(flight.id);
            expect(booking.passengers).toHaveLength(1);
            expect(booking.passengers[0].firstName).toBe(passenger.firstName);
        });
    });

    test('CP - Mostrar mensaje cuando existen campos obligatorios vacíos', async ({ page, request }) => {

        const flightsApi = new FlightsApi(request);
        const bookingPage = new BookingStep1Page(page);

        let flight: any;

        await test.step('Given: Existe un vuelo disponible', async () => {
            const result = await flightsApi.getAll();
            flight = result.body[0];
        });

        await test.step('When: El usuario intenta continuar sin completar los datos', async () => {
            await bookingPage.openBooking(
                flight.id,
                1
            );
            await bookingPage.clickContinue();
        });

        await test.step('Then: Se muestra el mensaje de validación', async () => {
            await bookingPage.validateRequiredMessage();
        });

    });

    test('CP - Mostrar exactamente tres formularios para tres pasajeros', async ({ page, request }) => {

        const flightsApi = new FlightsApi(request);
        const bookingPage = new BookingStep1Page(page);

        let flight: any;

        await test.step('Given: Existe un vuelo disponible', async () => {
            const result = await flightsApi.getAll();
            flight = result.body[0];
        });

        await test.step('When: Se abre la reserva para tres pasajeros', async () => {
            await bookingPage.openBooking(
                flight.id,
                3
            );
        });

        await test.step('Then: Se muestran tres formularios independientes', async () => {
            await bookingPage.validatePassengerForms(3);
        });

    });

    test('CP - Generar identificadores únicos para cada pasajero', async ({ page, request }) => {

        const flightsApi = new FlightsApi(request);
        const bookingPage = new BookingStep1Page(page);

        let flight: any;

        await test.step('Given: Existe un vuelo disponible', async () => {
            const result = await flightsApi.getAll();
            flight = result.body[0];
        });

        await test.step('When: Se registran dos pasajeros', async () => {
            await bookingPage.openBooking(
                flight.id,
                2
            );
            const passenger1 = PassengerData.getPassenger();
            const passenger2 = PassengerData.getPassenger();

            await bookingPage.fillPassenger(1, passenger1);
            await bookingPage.fillPassenger(2, passenger2);

            await bookingPage.clickContinue();

        });

        await test.step('Then: Cada pasajero posee un identificador diferente', async () => {

            const booking = await bookingPage.getBookingLocalStorage();

            expect(booking.passengers[0].id).toBe('pax1');
            expect(booking.passengers[1].id).toBe('pax2');

        });

    });

    test('CP - Navegar al paso de selección de asientos', async ({ page, request }) => {

        const flightsApi = new FlightsApi(request);
        const bookingPage = new BookingStep1Page(page);

        let flight: any;

        const passenger = PassengerData.getPassenger();

        await test.step('Given: Existe un vuelo disponible', async () => {
            const result = await flightsApi.getAll();
            flight = result.body[0];
        });

        await test.step('When: El usuario completa la información requerida', async () => {
            await bookingPage.openBooking(
                flight.id,
                1
            );

            await bookingPage.fillPassenger(1, passenger);
            await bookingPage.clickContinue();

        });

        await test.step('Then: Se redirecciona al paso de selección de asientos', async () => {
            await bookingPage.validateRedirect();
        });

    });

});