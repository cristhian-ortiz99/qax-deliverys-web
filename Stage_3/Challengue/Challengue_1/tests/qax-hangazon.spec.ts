import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Proceso de compra - HANGUAZON', () => {

    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
    });

    test('El carrito muestra los productos agregados con nombre, precio y cantidad', async ({ page }) => {

        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);
        
        await test.step('Given Agregar un producto al carrito desde la página principal', async () => {
            await homePage.agregarProducto(0);
        });

        await test.step('When se agrega un producto al carrito y se ingresa al carrito de compras', async () => {
            await expect(homePage.floatingCart).toBeVisible();
            await homePage.irAlCarrito();
        });

        await test.step('Then el carrito muestra el producto con nombre, precio y cantidad', async () => {
            await expect(cartPage.cartItems).toHaveCount(1);
            await expect(cartPage.productTitle).toBeVisible();
            await expect(cartPage.productPrice).toBeVisible();
            await expect(cartPage.quantityInput).toHaveValue('1');
        });
    });

    test('Al modificar la cantidad de un producto, el subtotal se recalcula', async ({ page }) => {

        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);

        let subtotalInicial: string | null;
        
        await test.step('Given se tiene un producto agregado en el carrito carrito', async () => {
            await homePage.agregarProducto(0);
            await homePage.irAlCarrito();
        });

        await test.step('When se incremente la cantidad del producto', async () => {
            subtotalInicial = await cartPage.obtenerSubtotal();

            await cartPage.aumentarCantidad();
        });

        await test.step('Then la cantidad del producto aumenta y el subtotal se recalcula', async () => {
            
            await expect(cartPage.quantityInput).toHaveValue('2');

            const subtotalFinal = await cartPage.obtenerSubtotal();

            expect(subtotalFinal).not.toBe(subtotalInicial);
        });
    });

    test('Al hacer clic en "Proceder al Pago", navega al checkout', async ({ page }) => {

        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);
        
        await test.step('Given se tiene un producto agregado en el carrito carrito', async () => {
            await homePage.agregarProducto(0);
            await homePage.irAlCarrito();
        });

        await test.step('When se selecciona proceder al pago', async () => {
            await cartPage.irCheckout();
        });

        await test.step('Then se redirige a la pagina de checkout', async () => {
            await expect(page).toHaveURL(/checkout.html/);
        });
    });

    test('El checkout muestra 4 pasos: Dirección, Envío, Pago, Revisión', async ({ page }) => {

        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        
        await test.step('Given se agrega un producto y accede al checkout', async () => {
            await homePage.agregarProducto(0);
            await homePage.irAlCarrito();
            await cartPage.irCheckout();
        });

        await test.step('Then se muestra los 4 pasos del proceso', async () => {
            await expect(checkoutPage.stepDireccion).toBeVisible();
            await expect(checkoutPage.stepEnvio).toBeVisible();
            await expect(checkoutPage.stepPago).toBeVisible();
            await expect(checkoutPage.stepRevision).toBeVisible();
        });

    });

    test('Al completar el paso 1 (Dirección), el paso 2 se habilita', async ({ page }) => {

        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        
        await test.step('Given se agrega un producto y accede al checkout', async () => {
            await homePage.agregarProducto(0);
            await homePage.irAlCarrito();
            await cartPage.irCheckout();
        });

        await test.step('When se completa los datos de información', async () => {
            await checkoutPage.completarDireccion();
            await checkoutPage.continuar();
        });

        await test.step('Then envío queda habilitado', async () => {
            await expect(checkoutPage.stepEnvio).toHaveClass(/active/);
        });

    });

    test('Al seleccionar un método de envío, la opción se marca como seleccionada', async ({ page }) => {

        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        
        await test.step('Given se agrega un producto y accede al checkout', async () => {
            await homePage.agregarProducto(0);
            await homePage.irAlCarrito();
            await cartPage.irCheckout();
        });

        await test.step('When se completa los datos de información', async () => {
            await checkoutPage.completarDireccion();
            await checkoutPage.continuar();
        });

        await test.step('Then al seleccionar un metodo de envio se queda seleccionado', async () => {
            await checkoutPage.seleccionarMetodoEnvio(1);

            const seleccionado = await checkoutPage.validarMetodoEnvioSeleccionado(1);
            expect(seleccionado).toBeTruthy();
        });

    });
    
   test('Al seleccionar un método de pago, la opción se marca como seleccionada', async ({ page }) => {

        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        
        await test.step('Given se agrega un producto y accede al checkout', async () => {
            await homePage.agregarProducto(0);
            await homePage.irAlCarrito();
            await cartPage.irCheckout();
        });

        await test.step('When se completa los datos de informacióny se selecciona el envío', async () => {
            await checkoutPage.completarDireccion();
            await checkoutPage.continuar();
            await checkoutPage.continuar();
        });

        await test.step('Then selecciona un metodo de pago y se queda seleccionado', async () => {
            await checkoutPage.seleccionarMetodoPago(1);

            const seleccionado = await checkoutPage.validarMetodoPagoSeleccionado(1);
            expect(seleccionado).toBeTruthy();
        });

    });
    
   test('En el paso 4 (Revisión) se muestran todos los datos ingresados', async ({ page }) => {

        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        
        await test.step('Given se agrega un producto, accede al checkout y continua con los pasos', async () => {
            await homePage.agregarProducto(0);
            await homePage.irAlCarrito();
            await cartPage.irCheckout();
            await checkoutPage.completarDireccion();
            await checkoutPage.continuar();
            //Envio
            await checkoutPage.continuar();
            //Pago
            await checkoutPage.continuar();
        });

        await test.step('Then se muestra los datos ingresados ', async () => {
            
            expect(await checkoutPage.validarTextoRevision('Cristhian Ortiz')).toBeTruthy();
            expect(await checkoutPage.validarTextoRevision('987654321')).toBeTruthy();
            expect(await checkoutPage.validarTextoRevision('Av. Arenales 123')).toBeTruthy();
        });

    });
    
   test('Al confirmar el pedido, se muestra un ID de orden (HGZ-XXXXXXXXXX)', async ({ page }) => {

        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        
        await test.step('Given completa checkout hasta step revisiòn', async () => {
            await homePage.agregarProducto(0);
            await homePage.irAlCarrito();
            await cartPage.irCheckout();
            await checkoutPage.completarDireccion();
            await checkoutPage.continuar();
            await checkoutPage.continuar();
            await checkoutPage.continuar();
        });

        await test.step('When se confirma el pedido', async () => {
            await checkoutPage.confirmarPedido();
        });

        await test.step('Then se muestra el ID de orden generado', async () => {
            await expect(checkoutPage.successBox).toBeVisible();

            const NroOrden = await checkoutPage.obtenerNumeroOrdenValido();

            expect(NroOrden).not.toBeNull();
            expect(NroOrden).toMatch(/^HGZ-[A-Z0-9]+$/);
        });

    });
});