import { test, expect } from '@playwright/test';
import { FlightsApi } from '../../apis/FlightsApis';
import { BookingStep3Page } from '../../pages/BookingStep3Page';

test.describe('HU04 - Seleccionar servicios de equipaje', () => {

    test('CP - Seleccionar múltiples servicios de equipaje', async ({ page, request }) => {

        const flightsApi = new FlightsApi(request);
        const bookingStep3Page = new BookingStep3Page(page);

        let flight: any;

        await test.step('Given: Existe un vuelo disponible obtenido desde API', async () => {

            const result = await flightsApi.getAll();
            expect(result.res.status()).toBe(200);
            flight = result.body[0];
            expect(flight).toBeDefined();
        });

        await test.step('And: Existen pasajeros y asientos almacenados', async () => {

            await page.addInitScript((booking) => {
                localStorage.setItem('qaxTravelBooking',JSON.stringify(booking));
            }, {
                flightId: flight.id,
                pax: 2,
                passengers: [
                    {
                        id: 'pax1',
                        firstName: 'Cristhian',
                        lastName: 'Ortiz'
                    },
                    {
                        id: 'pax2',
                        firstName: 'Iker',
                        lastName: 'Ortiz'
                    }
                ],
                selectedSeats: ['2A', '2B']
            });

        });

        await test.step('When: El usuario ingresa al paso de equipaje', async () => {
            await bookingStep3Page.open(flight.id, 2);
            await bookingStep3Page.validatePageLoaded();
        });

        await test.step('And: Selecciona equipaje documentado', async () => {
            await bookingStep3Page.selectBaggage('checked');
        });

        await test.step('And: Selecciona equipaje deportivo', async () => {
            await bookingStep3Page.selectBaggage('sports');
        });

        await test.step('Then: Ambos servicios quedan seleccionados', async () => {
            await bookingStep3Page.validateOptionSelected('checked');
            await bookingStep3Page.validateOptionSelected('sports');
        });

        await test.step('And: El resumen muestra ambos servicios', async () => {
            await bookingStep3Page.validateSummary('Equipaje documentado');
            await bookingStep3Page.validateSummary('Equipaje deportivo');
        });

        await test.step('And: El total corresponde a la suma de ambos servicios', async () => {
            await bookingStep3Page.validateTotal('$235.000');
        });

        await test.step('When: El usuario continúa al paso de pago', async () => {
            await bookingStep3Page.continueToPayment();
        });

        await test.step('Then: El usuario es redireccionado al paso de pago', async () => {
            await bookingStep3Page.validateNavigationToStep4();
        });

    });

    test('CP - Continuar sin seleccionar servicios adicionales', async ({ page, request }) => {

        const flightsApi = new FlightsApi(request);
        const bookingStep3Page = new BookingStep3Page(page);

        let flight: any;

        await test.step('Given: Existe un vuelo disponible obtenido desde API', async () => {
            const result = await flightsApi.getAll();
            expect(result.res.status()).toBe(200);
            flight = result.body[0];
        });

        await test.step('And: Existen pasajeros y asientos almacenados', async () => {
            await page.addInitScript((booking) => {
                localStorage.setItem('qaxTravelBooking',JSON.stringify(booking));
            }, {
                flightId: flight.id,
                pax: 1,
                passengers: [
                    {
                        id: 'pax1',
                        firstName: 'QA',
                        lastName: 'Tester'
                    }
                ],
                selectedSeats: ['2A']
            });

        });

        await test.step('When: El usuario ingresa al paso de equipaje', async () => {
            await bookingStep3Page.open(flight.id, 1);
        });

        await test.step('Then: El resumen indica que no existen servicios seleccionados', async () => {
            await bookingStep3Page.validateEmptySummary();
        });

        await test.step('When: El usuario continúa al paso de pago', async () => {
            await bookingStep3Page.continueToPayment();
        });

        await test.step('Then: El usuario es redireccionado al paso de pago', async () => {
            await bookingStep3Page.validateNavigationToStep4();
        });

    });

    test('CP - Deseleccionar un servicio previamente seleccionado', async ({ page, request }) => {

        const flightsApi = new FlightsApi(request);
        const bookingStep3Page = new BookingStep3Page(page);

        let flight: any;

        await test.step('Given: Existe un vuelo disponible obtenido desde API', async () => {
            const result = await flightsApi.getAll();
            expect(result.res.status()).toBe(200);
            flight = result.body[0];
        });

        await test.step('And: Existen pasajeros y asientos almacenados', async () => {

            await page.addInitScript((booking) => {

                localStorage.setItem('qaxTravelBooking',JSON.stringify(booking));
            }, {
                flightId: flight.id,
                pax: 1,
                passengers: [
                    {
                        id: 'pax1',
                        firstName: 'QA',
                        lastName: 'Tester'
                    }
                ],
                selectedSeats: ['2A']
            });
        });

        await test.step('When: El usuario ingresa al paso de equipaje', async () => {
            await bookingStep3Page.open(flight.id, 1);
        });

        await test.step('And: Selecciona equipaje documentado', async () => {
            await bookingStep3Page.selectBaggage('checked');
        });

        await test.step('And: Vuelve a seleccionar el mismo servicio', async () => {
            await bookingStep3Page.selectBaggage('checked');
        });

        await test.step('Then: El servicio deja de estar seleccionado', async () => {
            await bookingStep3Page.validateOptionNotSelected('checked');
        });

        await test.step('And: El resumen vuelve a indicar que no existen servicios seleccionados', async () => {
            await bookingStep3Page.validateEmptySummary();
        });

    });

});