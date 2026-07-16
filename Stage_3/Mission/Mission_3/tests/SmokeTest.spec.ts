import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SeatsPage } from "../pages/SeatsPage";
import { CheckoutPage } from  "../pages/CheckoutPage";

test.describe('SMOKE TEST - Flujo completo de compra', () => {
    
        let home:HomePage;
        let seats:SeatsPage;
        let checkout:CheckoutPage;

    test.beforeEach(async ({page}) => {
        seats = new SeatsPage(page);
        home = new HomePage(page);
        checkout = new CheckoutPage(page);

        await home.navigate();
        })
    test('CP - End to End flujo de compras QAxTickets', async () =>{

        test.info().annotations.push({
            type: "Smoke",
            description: "Flujo principal del negocio"
        });

        await test.step('Given el ingresa a QAX tickets y selecciona el primer evento', async () => {
            await home.comprarPrimerEvento();
        });

        await test.step('When selecciona asientos libres para continuar con el pago', async () => {
            await seats.seleccionarAsientoLibre(3);
            await seats.continuarPago();
        });

        await test.step('And completa los datos de compra en Checkout', async () => {

            await checkout.completarDatosComprador(
            "Cristian Ortiz",
            "cris@test.com",
            "999999999"
            );
            await checkout.completarDatosTarjeta(
                '4343434343434344',
                '12/31',
                '123',
                'Cristhian test'
            );

            await checkout.realizarPago();
        });
            
        await test.step('Then el usuario es redirigido a la página Mis Tickets', async () => {
            await checkout.validarRedireccionTickets();
        });
    });
});