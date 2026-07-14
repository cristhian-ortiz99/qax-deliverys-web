import { test } from '@playwright/test';
import { CheckoutPage } from '../pages/CheckoutPage';
import { HomePage } from '../pages/HomePage';
import { SeatsPage } from '../pages/SeatsPage';

test.describe('HU03 - Checkout y pago con iframe', () => {

    let seatsPage: SeatsPage;
    let homePage: HomePage;
    let checkoutPage: CheckoutPage;

    
    test.beforeEach(async ({page}) => {
        seatsPage = new SeatsPage(page);
        homePage = new HomePage(page);
        checkoutPage = new CheckoutPage(page);

        await checkoutPage.navigate();
        await homePage.comprarPrimerEvento();
        await seatsPage.seleccionarAsientoLibre(3);
        await seatsPage.continuarPago();
    })

    test('CP - Validar el pago exitoso de las entradas', async () =>{

        await test.step('Given el usuario visualiza el formulario de checkout', async () => {
            await checkoutPage.validarFormularioComprador();
            await checkoutPage.validarResumenCompra();
        });

        await test.step('When el usuario completa los datos del comprador', async () => {
            await checkoutPage.completarDatosComprador(
                'Cristhian',
                'cristhian@test.com',
                '987654321'
            );
        });

        await test.step('And el usuario ingresa los datos de la tarjeta', async () => {
            await checkoutPage.completarDatosTarjeta(
                '4343434343434344',
                '12/31',
                '123',
                'Cristhian test'
            );
        });

        await test.step('And procesa el pago correctamente', async () => {
            await checkoutPage.realizarPago();
        });

        await test.step('Then el usuario es redirigido a la página Mis Tickets', async () => {
            await checkoutPage.validarRedireccionTickets();
        });
    })
})