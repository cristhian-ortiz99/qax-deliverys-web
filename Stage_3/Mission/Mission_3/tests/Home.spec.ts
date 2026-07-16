import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('HU01 - Explorar eventos', () => {

    let homePage : HomePage;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        await homePage.navigate();
    })

    test('CP - Filtrar eventos por categoría Fútbol', async () => {

        await test.step('Given el usuario ingresa a la página principal de eventos', async () => {
            await homePage.validarCantidadEventos();
            await homePage.validarInformacionEventos();
        });

        await test.step('When selecciona el filtro Fútbol', async () => {
            await homePage.filtrarFutbol();
        });

        await test.step('Then solo se muestran eventos de la categoría Fútbol', async () => {
            await homePage.validarSoloEventosFutbol();
        });

        await test.step('And el filtro Fútbol permanece resaltado', async () => {
            await homePage.validarFiltroActivo();
        });

    })

    test('CP - Navegar a la seleccion de asientos', async () => {

        await test.step('Given el usuario visualiza los eventos disponibles', async () => {
            await homePage.validarCantidadEventos();
        });

        await test.step('When hace clic en Comprar Entradas de un evento', async () => {
            await homePage.comprarPrimerEvento();
        });

        await test.step('Then es redirigido a la página de selección de asientos', async () => {
            await homePage.validarNavegacionAsientos();
        });
    })
})