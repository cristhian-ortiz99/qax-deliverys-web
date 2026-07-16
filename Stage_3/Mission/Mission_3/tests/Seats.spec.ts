import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SeatsPage } from '../pages/SeatsPage';

test.describe('HU02 - SELECCIONAR ASIENTOS', () => {

    let seatsPage: SeatsPage;
    let homePage: HomePage;

    
    test.beforeEach(async ({page}) => {
        seatsPage = new SeatsPage(page);
        homePage = new HomePage(page);

        await seatsPage.navigate();
        await homePage.comprarPrimerEvento();
    })

    test('CP - Validar la selección de asientos', async () =>{

        await test.step('Given el usuario visualiza el mapa de asientos del evento', async () => {
            await seatsPage.validarEventoVisible();
            await seatsPage.validarZonas();
        });

        await test.step('And los asientos muestran el color correspondiente', async () => {
            await seatsPage.validarColorDisponible();
            //await seatsPage.validarColorOcupado();
        });

        await test.step('When el usuario selecciona un asiento disponible', async () => {
            await seatsPage.seleccionarAsientoLibre(0);
        });

        await test.step('Then el asiento cambia al estado seleccionado', async () => {
            await seatsPage.validarAsientoSeleccionado();
            await seatsPage.validarColorSeleccionado();
        });

        await test.step('And el panel flotante muestra el resumen de compra', async () => {
            await seatsPage.validarPanelResumen();
            await seatsPage.validarBotonContinuarHabilitado();
        });
    })

    test('CP - Validar el límite máximo de selección de asientos', async () =>{

        /*await test.step('Given el usuario no ha seleccionado asientos', async () => {
            await seatsPage.validarBotonContinuarDeshabilitado();
        });*/

        await test.step('When el usuario selecciona cuatro asientos', async () => {
            await seatsPage.seleccionarCuatroAsientos();
        });

        await test.step('And intenta seleccionar un quinto asiento', async () => {
            await seatsPage.intentarSeleccionarQuintoAsiento();
        });

        await test.step('Then se muestra la advertencia del límite permitido', async () => {
            await seatsPage.validarAdvertenciaMaxima();
        });

        await test.step('And únicamente permanecen cuatro asientos seleccionados', async () => {
            await seatsPage.validarCantidadAsientosSeleccionados(4);
        });
    })
})