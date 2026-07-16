import { test } from '@playwright/test';
import { PortafolioPage } from '../pages/PortafolioPage';

test.describe('HU03 - Portafolio y P&L', () => {
    
    let portafolioPage : PortafolioPage;
    
        test.beforeEach(async ({page}) =>{
            portafolioPage = new PortafolioPage(page);
            await portafolioPage.navigate();
            await page.getByRole('link',{name: 'Portafolio'}).click();
        })

    test('CP - Validar la información del portafolio', async () => {
        await test.step('Given el usuario ingresa a portafolio y visualiza la tabla de holdings', async () => {  
            await portafolioPage.validarTablaVisible();
        });
        await test.step('Then se muestran los registros del portafolio', async () => {
                await portafolioPage.validarHoldings();
        });

        await test.step('And cada holding muestra cantidad, precio promedio y valor total', async () => {
                await portafolioPage.validarColumnas();
        });

        await test.step('And la columna P&L muestra el color correspondiente', async () => {
                await portafolioPage.validarColorPL();
        });
        await test.step('And el gráfico de distribución se renderiza correctamente', async () => {
                await portafolioPage.validarPieChart();
                await portafolioPage.validarLeyendaPie();
        });
    })

    test('CP - Validar el estado vacío del portafolio', async () => {

        await test.step('Given el portafolio no posee holdings', async () => {
                await portafolioPage.limpiarHoldings();
                await portafolioPage.reload();
        });
        await test.step('Then se muestra el estado vacío del portafolio', async () => {
                await portafolioPage.validarEstadoVacio();
        });

    })
})