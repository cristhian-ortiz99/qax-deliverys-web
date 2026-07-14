import { test } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('HU01 - Dashboard en vivo', () => {

    let dashboardPage: DashboardPage;
    test.beforeEach(async ({ page }) => {
        dashboardPage = new DashboardPage(page);
        await dashboardPage.navigate();
    });

    test('CP01 - Validar el dashboard en vivo', async () => {
        
        test.info().annotations.push({
            type: 'Historia de Usuario',
            description: 'HU-01 Dashboard en vivo'
        });

        await test.step('Given que el usuario ingresa al dashboard', async ()=>{
            await dashboardPage.validarWatchlistVisible();
        })

        await test.step('Then se muestra el resumen del portafolio', async ()=>{
            await dashboardPage.validarResumenPortafolio();
        })

        await test.step('And la watchlist contiene 10 activos', async () => {
            await dashboardPage.validarCantidadActivos(10);
        });

        await test.step('And los cambios positivos y negativos muestran su color correspondiente', async () => {
            await dashboardPage.validarColoresCambioPrecio();
        });

        await test.step('And el mini gráfico contiene 20 velas', async () => {
            await dashboardPage.validarGraficoVelasVisible();
            await dashboardPage.validarCantidadVelas(20);
        });
    })
})