import { test, expect, Locator } from '@playwright/test';

test.describe('Compra en QAX Shop', () => {

  test('Buscar producto, agregar al carrito y comprar', async ({ page }) => {
    let nombreProd: string;
    // Paso 1 - Given: que el paciente abre la página de login de QAX Clinic
    await test.step('Given que el usuario abre el catálogo de QAX Shop', async () => {
      await page.goto('https://qaxpert.com/lab/sites/stage-1/shop/index.html');
      await expect(page).toHaveTitle('QAX Shop — Tienda de Productos LATAM');
    });
    
    // Paso 2 - When: busca "ca" en el buscador
    await test.step('When: busca "ca" en el buscador', async () => {
      await page.getByPlaceholder('Buscar productos...').fill('Ca');

    });
    // Paso 3 -And agrega el primer resultado al carrito
    await test.step('And agrega el primer resultado al carrito', async () => {
        const primerProd = page.locator('#productsGrid .product-card').first();
        nombreProd = (await primerProd.locator('.product-name').textContent())?.trim() ?? '';
        await primerProd.getByRole('button', { name: 'Agregar al Carrito' }).click();
    });
    // Paso 4 -And navega al checkout
    await test.step('And navega al checkout', async () => {
        await page.getByRole('link', { name: '🛒'}).click();
        await expect(page).toHaveURL(/cart\.html/);
        await expect(page.getByText(nombreProd)).toBeVisible();
        await page.getByRole('link', { name: 'Ir a Pagar' }).click();
        await expect(page).toHaveTitle('This Page Does Not Exist');
    });

  });
});
