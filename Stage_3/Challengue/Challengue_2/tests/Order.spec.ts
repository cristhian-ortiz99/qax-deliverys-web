import { test, expect } from '@playwright/test';
import { OrderPage } from '../pages/OrderPage';

test.describe('HU02 - Orden de compra', () =>{
    
    let orderPage : OrderPage;

    test.beforeEach(async ({page}) =>{
        orderPage = new OrderPage(page);
        await orderPage.navigate();
        await page.getByRole('link',{name: 'Ordenes'}).click();
    })

    test('CP - Validar el comportamiento del formulario', async () => {
        
        await test.step('Given que el usuario ingresa a la pantalla de órdenes', async () => {
                await expect(orderPage.cboActivo).toBeVisible();
                await expect(orderPage.cboTipoOrden).toBeVisible();
        });

        await test.step('When selecciona el activo AAPL', async () => {
                await orderPage.seleccionarActivo('AAPL');
        });

        await test.step('Then se muestra el precio actual del activo', async () => {
                await orderPage.validarPrecioActualVisible();
        });

        await test.step('When selecciona el tipo de orden Market', async () => {
                await orderPage.seleccionarTipoOrden('market');
        });

        await test.step('Then únicamente se muestran los campos Cantidad y Lado', async () => {
                await orderPage.validarCamposMarket();
        });

        await test.step('When cambia el tipo de orden a Limit', async () => {
                await orderPage.seleccionarTipoOrden('limit');
        });

        await test.step('Then se visualiza el campo Precio Límite', async () => {
                await orderPage.validarCampoPrecioLimiteVisible();
        });

        await test.step('When el formulario está incompleto', async () => {
                await orderPage.validarBotonDeshabilitado();
        });
    });

    test('CP - Validar la creación de una orden para AAPL', async () => {
        await test.step('Giveln el usuario completa todos los campos obligatorios', async () => {
                await orderPage.seleccionarActivo('AAPL');
                await orderPage.seleccionarTipoOrden('market');
                await orderPage.ingresarCantidad(5);
                await orderPage.seleccionarLado('buy');
        });
        await test.step('And envía la orden', async () => {
                await orderPage.enviarOrden();
        });

        await test.step('Then se muestra el modal de confirmación', async () => {
                await orderPage.validarModalVisible();
        });

        await test.step('And se genera un ID de orden válido', async () => {
                await orderPage.validarOrderId();
        });
    })

})