import { test, expect } from '@playwright/test';
import { UsersApi } from '../apis/UsersApi';
import { ProductsApi } from '../apis/ProductsApi';
import { LoginPage } from '../pages/LoginPage';
import {OrdersApi} from '../apis/OrdersApi';
import {OrdersPage} from '../pages/OrdersPage';

const SUT = 'http://localhost:4001';

test.describe('Flujo E2E — SUT QAXadmin', () => {

  test('Crear orden por API y validar en UI', async ({ request, page }) => {

    const usersApi = new UsersApi(request);
    const productsApi = new ProductsApi(request);
    const ordersApi = new OrdersApi(request);

    const loginPage = new LoginPage(page);
    const ordersPage = new OrdersPage(page);

    const email = `cristhian_${Date.now()}@qa.com`;

    const user = await usersApi.create({
      nombre: 'Cristhian',
      email,
      rol: 'Comprador',
      estado: 'active',
    });

    const product = await productsApi.create({
        nombre: `Producto ${Date.now()}`,
        categoria: 'Electrónica',
        precio: 3500,
        stock: 8
    });

    const order = await ordersApi.create({
        cliente: user.nombre,
        producto: product.nombre,
        total: product.precio
    });

    expect(order.id).toBeDefined();

    await page.goto(SUT);
    await loginPage.loginAs('admin@qaxpert.com', 'admin123');
    await page.waitForURL('**/dashboard.html');

    await page.goto(`${SUT}/orders.html`);
    await page.waitForTimeout(2000);
    await ordersPage.searchOrder(user.nombre);

    await ordersPage.validarCliente(user.nombre);
    await ordersPage.validarProducto(product.nombre);
    await ordersPage.validarTotalProducto(product.nombre, product.precio);

    await ordersPage.validarEstado('Pendiente');
  });

})