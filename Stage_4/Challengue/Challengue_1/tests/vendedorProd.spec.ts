import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { OrderProductsPage } from '../pages/OrdeProductsPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductData } from '../utils/ProductData';

test.describe('HU02 - Gestión de productos como vendedor', () => {

    test('CP - Publicar un producto correctamente', async ({page})=>{

        const homePage = new HomePage(page);
        const orderProductsPage = new OrderProductsPage(page);
        const productsPage = new ProductsPage(page);

        const producto = ProductData.getProduct();

        await test.step('Given el usuario ingresa al Marketplace como vendedor', async () => {
            await homePage.navigate();
            await homePage.ingresarComoVendedor();
        });

        await test.step('Abrir formulario de publicación', async () => {
            await productsPage.abrirFormularioNuevoProducto();
        });

        await test.step('Completar datos del producto', async () => {
            await productsPage.registrarProducto(producto);
        });

        await test.step('Publicar producto', async () => {
            await productsPage.publicarProducto();
        });

        await test.step('Ir a órdenes recibidas', async () => {
            await productsPage.irOrdenesRecibidas();
        });

        await test.step('Validar página de órdenes', async () => {
            await orderProductsPage.validarPaginaOrdenes();
        });
    })


})