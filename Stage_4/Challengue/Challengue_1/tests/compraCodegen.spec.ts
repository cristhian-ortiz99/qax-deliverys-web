import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://qaxpert.com/lab/sites/stage-4/marketplace/index.html');
  await page.getByText('🛒').click();
  await page.getByText('Samsung Galaxy S23').click();
  await page.getByRole('button', { name: 'Agregar al Carrito' }).click();
  await page.getByRole('link', { name: '🛒 Carrito (1)' }).click();
  await expect(page.getByRole('cell', { name: 'Samsung Galaxy S23' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Ir a Pagar' })).toBeVisible();
  await page.getByRole('link', { name: 'Ir a Pagar' }).click();
  await page.getByRole('textbox', { name: 'Nombre Completo' }).click();
  await page.getByRole('textbox', { name: 'Nombre Completo' }).fill('cristhian');
  await page.getByRole('textbox', { name: 'Nombre Completo' }).press('Tab');
  await page.getByRole('textbox', { name: 'Dirección' }).fill('arenales 321');
  await page.getByRole('textbox', { name: 'Dirección' }).press('Tab');
  await page.getByRole('textbox', { name: 'Teléfono' }).fill('99543423');
  await page.getByLabel('Ciudad').selectOption('Medellín');
  await page.getByRole('button', { name: 'Continuar al Pago' }).click();
  await page.getByRole('textbox', { name: 'Número de Tarjeta' }).click();
  await page.getByRole('textbox', { name: 'Número de Tarjeta' }).fill('3232323232324342');
  await page.getByRole('textbox', { name: 'Vencimiento' }).click();
  await page.getByRole('textbox', { name: 'Vencimiento' }).fill('0528');
  await page.getByRole('textbox', { name: 'CVV' }).click();
  await page.getByRole('textbox', { name: 'CVV' }).fill('436');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Confirmar Pedido' }).click();
  await page.goto('https://qaxpert.com/lab/sites/stage-4/marketplace/buyer-orders.html');
  await expect(page.getByText('cristhian — arenales')).toBeVisible();
});