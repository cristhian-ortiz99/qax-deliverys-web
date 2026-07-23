import { test, expect } from '@playwright/test';
import { FlightsApi } from '../../apis/FlightsApis';
import { BookingStep2Page } from '../../pages/BookingStep2Page';

test.describe('HU03 - Seleccionar asientos', () => {
    test('CP - Seleccionar correctamente la cantidad de asientos requerida', async ({ page, request }) => {

        const flightsApi = new FlightsApi(request);
        const bookingStep2Page = new BookingStep2Page(page);
        let flight: any;

        await test.step('Given: Existe un vuelo disponible obtenido desde API', async () => {

            const result = await flightsApi.getAll();
            expect(result.res.status()).toBe(200);
            flight = result.body[0];
            expect(flight).toBeDefined();

        });

        await test.step('And: Existen datos de pasajeros almacenados en localStorage', async () => {

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
                ]
            });
        });

        await test.step('When: El usuario ingresa al paso de selección de asientos', async () => {
            await bookingStep2Page.open(flight.id, 2);
            await bookingStep2Page.validatePageLoaded();
        });

        await test.step('And: Selecciona dos asientos disponibles', async () => {
            await bookingStep2Page.selectSeat('2A');
            await bookingStep2Page.selectSeat('2B');
        });

        await test.step('Then: El indicador muestra los asientos seleccionados', async () => {
            await bookingStep2Page.validateIndicator(2, 2);
        });

        await test.step('And: El botón Continuar se encuentra habilitado', async () => {
            await bookingStep2Page.validateContinueButtonEnabled();
        });

        await test.step('When: El usuario continúa al siguiente paso', async () => {
            await bookingStep2Page.continueToBaggage();
        });

        await test.step('And: El usuario es redireccionado al paso de equipaje', async () => {
            await bookingStep2Page.validateNavigationToStep3();
        });

    });

    test('CP - No permitir seleccionar más asientos que pasajeros', async ({ page, request }) => {

        const flightsApi = new FlightsApi(request);
        const bookingStep2Page = new BookingStep2Page(page);

        let flight: any;

        await test.step('Given: Existe un vuelo disponible', async () => {
            const result = await flightsApi.getAll();
            expect(result.res.status()).toBe(200);
            flight = result.body[0];
        });

        await test.step('And: Existe información de un pasajero', async () => {
            await page.addInitScript((booking) => {localStorage.setItem('qaxTravelBooking',JSON.stringify(booking));
            }, {
                flightId: flight.id,
                pax: 1,
                passengers: [
                    {
                        id: 'pax1',
                        firstName: 'Cristhian',
                        lastName: 'Ortiz'
                    }
                ]
            });
        });

        await test.step('When: Ingresa al mapa de asientos', async () => {
            await bookingStep2Page.open(flight.id,1);
        });

        await test.step('And: Selecciona un asiento disponible', async () => {
            await bookingStep2Page.selectSeat('2A');
        });

        await test.step('And: Intenta seleccionar un segundo asiento', async () => {
            page.once('dialog', async dialog => {
                expect(dialog.message()).toContain('Solo puedes seleccionar');
                await dialog.accept();
            });

            await bookingStep2Page.selectSeat('2B');

        });

        await test.step('Then: Solo permanece un asiento seleccionado', async () => {
            await bookingStep2Page.validateIndicator(1,1);
        });

    });

    test('CP - Deseleccionar un asiento previamente seleccionado', async ({ page, request }) => {

        const flightsApi = new FlightsApi(request);
        const bookingStep2Page = new BookingStep2Page(page);

        let flight:any;

        await test.step('Given: Existe un vuelo disponible', async()=>{
            const result = await flightsApi.getAll();
            expect(result.res.status()).toBe(200);
            flight = result.body[0];
        });

        await test.step('And: Existen pasajeros registrados', async()=>{
            await page.addInitScript((booking)=>{localStorage.setItem('qaxTravelBooking',JSON.stringify(booking));
            },{
                flightId: flight.id,
                pax:1,
                passengers:[
                    {
                        id:'pax1',
                        firstName:'QA',
                        lastName:'Tester'
                    }
                ]
            });

        });

        await test.step('When: Ingresa al paso de asientos', async()=>{
            await bookingStep2Page.open(flight.id,1);
        });

        await test.step('And: Selecciona un asiento', async()=>{
            await bookingStep2Page.selectSeat('2A');
        });

        await test.step('And: Deselecciona el mismo asiento', async()=>{
            await bookingStep2Page.selectSeat('2A');
        });

        await test.step('Then: El indicador vuelve a cero', async()=>{
            await bookingStep2Page.validateIndicator(0,1);
        });

        await test.step('And: El botón continuar permanece deshabilitado', async()=>{
            await bookingStep2Page.validateContinueButtonDisabled();
        });
    });

});