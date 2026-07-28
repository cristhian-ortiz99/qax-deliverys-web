import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://qaxpert.com/lab/sites/stage-4/marketplace/index.html');
  await page.getByText('🏪').click();
  await page.getByRole('link', { name: '+ Publicar Nuevo Producto' }).click();
  await page.getByRole('textbox', { name: 'Nombre del Producto' }).click();
  await page.getByRole('textbox', { name: 'Nombre del Producto' }).fill('Iphone 15 pro');
  await page.getByRole('textbox', { name: 'Descripción' }).click();
  await page.getByRole('textbox', { name: 'Descripción' }).fill('apple');
  await page.getByLabel('Categoría').selectOption('Celulares y Telefonía');
  await page.getByRole('spinbutton', { name: 'Precio (COP)' }).click();
  await page.getByRole('spinbutton', { name: 'Precio (COP)' }).fill('50000');
  await page.getByRole('spinbutton', { name: 'Stock Disponible' }).click();
  await page.getByRole('spinbutton', { name: 'Stock Disponible' }).fill('5');
  await page.getByRole('button', { name: 'Publicar Producto' }).click();
  await page.getByRole('link', { name: 'Órdenes Recibidas' }).click();
});