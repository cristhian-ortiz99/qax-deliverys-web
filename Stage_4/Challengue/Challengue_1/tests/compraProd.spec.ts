import { test } from '@playwright/test';

import { HomePage } from '../pages/HomePage';
import { MarketplacePage } from '../pages/MarketplacePage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutData } from '../utils/CheckoutData';
import { OrdersPage } from '../pages/OrdersPage';

test.describe('HU01 - Compra de producto', ()=>{

    test('CP - Comprar un producto de manera exitosa', async ({page}) => {

        const homePage = new HomePage(page);
        const marketplacePage = new MarketplacePage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const ordersPage = new OrdersPage(page);

        const buyer = CheckoutData.getBuyer();
        const payment = CheckoutData.getPayment();

        await test.step('Given el usuario abre Marketplace e ingresar como comprador', async () => {

            await homePage.navigate();
            await homePage.ingresarComoComprador();

        });

        await test.step('And selecciona un producto y lo agrega al carrito', async () => {

            await marketplacePage.seleccionarProducto('Samsung Galaxy S23');
            await marketplacePage.agregarAlCarrito();
            await marketplacePage.abrirCarrito();
        });

        await test.step('Then valida el producto y procede a ir al checkout', async () => {
            await cartPage.continuarCheckout();
        });

        await test.step('And completa datos de envío y de pago', async () => {
            await checkoutPage.ingresarNombre(buyer.nombre);
            await checkoutPage.ingresarDireccion(buyer.direccion);
            await checkoutPage.ingresarTelefono(buyer.telefono);
            await checkoutPage.seleccionarCiudad(buyer.ciudad);
            await checkoutPage.continuarPago();

            await checkoutPage.ingresarNumeroTarjeta(payment.numeroTarjeta);
            await checkoutPage.ingresarVencimiento(payment.vencimiento);
            await checkoutPage.ingresarCVV(payment.cvv);
        });

        await test.step('And Confirmar pedido', async () => {
            page.once('dialog', async dialog => {
                console.log(dialog.message());
                await dialog.dismiss();
            });
            await checkoutPage.confirmarPedido();
        });

        await test.step('Then valida su pedido registrado', async () => {
            await ordersPage.validarPedido(buyer.nombre,buyer.direccion);
        });

    })
})