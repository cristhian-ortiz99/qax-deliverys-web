import { test } from '@playwright/test';
import { AlertasPage } from '../pages/AlertasPage';

test.describe('HU04 - Alertas de precio', () => {

    let alertasPage : AlertasPage;

    test.beforeEach(async ({page}) =>{
            alertasPage = new AlertasPage(page);
            await alertasPage.navigate();
            await page.getByRole('link',{name: 'Alertas'}).click();
        })
    

    test('CP - Crear una alerta de precio', async () => {

        await test.step('Given el usuario ingresa al módulo de alertas', async () => {
            await alertasPage.validarFormulario();
        });

        await test.step('When registra una alerta para BTC por encima del precio objetivo', async () => {
            await alertasPage.crearAlerta(
                'BTC',
                'above',
                5000
            );
        });

        await test.step('Then la alerta aparece en la lista', async () => {
            await alertasPage.validarAlertaCreada();
        });

        await test.step('And la alerta muestra el botón ON/OFF', async () => {
            await alertasPage.validarToggleVisible();
        });
    })

    test('CP - Desactivar y eliminar una alerta', async () => {

        await test.step('Given existe una alerta creada', async () => {
            await alertasPage.crearAlerta(
                'BTC',
                'above',
                5000
            );
            await alertasPage.validarAlertaCreada();
        })
        await test.step('When el usuario desactiva la alerta', async () => {
            await alertasPage.desactivarPrimeraAlerta();
        });

        await test.step('And el usuario elimina la alerta', async () => {
            await alertasPage.eliminarPrimeraAlerta();
        });

        await test.step('Then la alerta desaparece de la lista', async () => {
            await alertasPage.validarAlertaEliminada();
        });
        await test.step('And se muestra el estado vacío', async () => {
            await alertasPage.validarEstadoVacio();
        });
    })
})