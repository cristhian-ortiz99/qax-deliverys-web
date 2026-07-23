import { test, expect } from '@playwright/test';
import { BookingsApi } from '../../apis/BookingsApi';
import { TripsPage } from '../../pages/TripsPage';


test.describe('HU06 - Consultar reservas en Mis Viajes', () => {

    test('CP - Visualizar reservas existentes', async ({ page, request }) => {

        const bookingsApi = new BookingsApi(request);
        const tripsPage = new TripsPage(page);

        let bookings: any[];

        await test.step('Given: Existen reservas registradas en el sistema', async () => {
            
            const result = await bookingsApi.getAll();
            expect(result.response.status()).toBe(200);
            bookings = result.body;
            expect(bookings.length).toBeGreaterThan(0);
        });

        await test.step('When: El usuario ingresa a la página Mis Viajes', async () => {
            await tripsPage.open();
            await tripsPage.validatePageLoaded();
        });

        await test.step('Then: Se muestran las reservas próximas disponibles', async () => {
            const upcoming = bookings.filter(booking => new Date(booking.departDate) >= new Date());
            await tripsPage.validateTripsExist();
            await tripsPage.validateTripsCount(upcoming.length);
        });
    });

    test('CP - Visualizar reservas pasadas', async ({ page, request }) => {

        const bookingsApi = new BookingsApi(request);
        const tripsPage = new TripsPage(page);

        let bookings: any[];

        await test.step('Given: Existen reservas registradas en el sistema', async () => {
            const result = await bookingsApi.getAll();
            expect(result.response.status()).toBe(200);
            bookings = result.body;
        });

        await test.step('When: El usuario ingresa a Mis Viajes', async () => {
            await tripsPage.open();
            await tripsPage.validatePageLoaded();
        });

        await test.step('And: Selecciona la pestaña Pasados', async () => {
            await tripsPage.clickPast();
            await tripsPage.validatePastTabActive();
        });

        await test.step('Then: Se muestran únicamente las reservas pasadas', async () => {
            const pastBookings = bookings.filter(booking => new Date(booking.departDate) < new Date());
            await tripsPage.validateTripsCount(pastBookings.length);
        });

    });

    test('CP - Visualizar E-Ticket de una reserva', async ({ page, request }) => {

        const bookingsApi = new BookingsApi(request);
        const tripsPage = new TripsPage(page);

        let booking: any;

        await test.step('Given: Existe una reserva registrada', async () => {
            const result = await bookingsApi.getAll();
            expect(result.response.status()).toBe(200);
            booking = result.body[0];
            expect(booking).toBeDefined();
        });

        await test.step('When: El usuario ingresa a Mis Viajes', async () => {
            await tripsPage.open();
            await tripsPage.validatePageLoaded();
        });

        await test.step('And: Selecciona el enlace Ver E-Ticket', async () => {
            await tripsPage.clickEticket();
        });

        await test.step('Then: El sistema redirecciona al detalle de la reserva', async () => {
            await tripsPage.validateNavigationToBooking(booking.id);
        });

    });

});