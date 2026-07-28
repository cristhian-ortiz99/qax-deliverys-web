import { test } from '@playwright/test';
import { BookingUtils } from '../../utils/bookingData';
import { BookingStep4Page } from '../../pages/BookingStep4Page';
import { BookingConfirmationPage } from '../../pages/BookingConfirmationPage';

test.describe('HU05 - Realizar pago', () => {

    test('CP - Realizar pago exitoso y confirmar reserva', async ({ page, request }) => {
        const bookingStep4Page = new BookingStep4Page(page);
        const confirmationPage = new BookingConfirmationPage(page);

        let flight: any;

        await test.step('Given: Existe un vuelo disponible', async () => {
            flight = await BookingUtils.getAvailableFlight(request);
        });

        await test.step('And: Existe una reserva preparada', async () => {
            await BookingUtils.prepareBookingData(
                    page,
                    flight.id,
                    2,
                    ['2A', '2B'],
                    ['checked']
            );
        });

        await test.step('When: El usuario ingresa al paso de pago', async () => {
            await bookingStep4Page.open(flight.id, 2);
            await bookingStep4Page.validatePageLoaded();
        });

        await test.step('Then: Tarjeta de crédito se encuentra seleccionada por defecto', async () => {
            await bookingStep4Page.validateDefaultPaymentMethod();
        });

        await test.step('When: Completa correctamente los datos de la tarjeta', async () => {
            await bookingStep4Page.fillCardInformation(
                '4111111111111111',
                '12/30',
                '123',
                'Cristhian Ortiz'
            );
        });

        await test.step('And: Realiza el pago', async () => {
            await bookingStep4Page.clickPay();
        });

        await test.step('Then: El usuario es redireccionado a la página de confirmación', async () => {
            await confirmationPage.validatePageLoaded();
        });

        await test.step('And: Se muestra un código de reserva válido', async () => {
            await confirmationPage.validateBookingCode();
        });

        await test.step('And: Se muestran los detalles del vuelo', async () => {
            await confirmationPage.validateFlightInformation();
        });

        await test.step('And: Se muestran los pasajeros', async () => {
            await confirmationPage.validatePassengerInformation();
        });

        await test.step('And: Se muestra el resumen del pago', async () => {
            await confirmationPage.validatePaymentInformation();
        });

    });

    test('CP - Validar resumen del pedido', async ({ page, request }) => {

        const bookingStep4Page = new BookingStep4Page(page);
        const flight = await BookingUtils.getAvailableFlight(request);

        await BookingUtils.prepareBookingData(
                    page,
                    flight.id,
                    2,
                    ['2A', '2B'],
                    ['checked']
        );
        await bookingStep4Page.open(flight.id, 2);

        await test.step('Then: Se muestra correctamente el resumen del pedido', async () => {
            await bookingStep4Page.validateOrderSummary();
            await bookingStep4Page.validateSummaryContains(flight.airline);
            await bookingStep4Page.validateSummaryContains(flight.originName);
            await bookingStep4Page.validateSummaryContains(flight.destinationName);
            await bookingStep4Page.validateSummaryContains('2A');
            await bookingStep4Page.validateSummaryContains('2B');
            await bookingStep4Page.validateSummaryContains('Equipaje documentado');
        });

    });

    test('CP - Validar tarjeta inválida', async ({ page, request }) => {
        const bookingStep4Page = new BookingStep4Page(page);
        const flight = await BookingUtils.getAvailableFlight(request);

        await BookingUtils.prepareBookingData(
                    page,
                    flight.id,
                    2,
                    ['2A', '2B'],
                    ['checked']
            );

        await bookingStep4Page.open(flight.id, 2);

        await test.step('When: El usuario ingresa datos inválidos de la tarjeta', async () => {
            await bookingStep4Page.fillCardInformation(
                '12345678',
                '',
                '12',
                ''
            );
            await bookingStep4Page.clickPay();

        });

        await test.step('Then: Se muestra un mensaje de error', async () => {
            await bookingStep4Page.validatePaymentError(
                'Todos los campos de la tarjeta son obligatorios y deben ser válidos.'
            );
        });

    });

});