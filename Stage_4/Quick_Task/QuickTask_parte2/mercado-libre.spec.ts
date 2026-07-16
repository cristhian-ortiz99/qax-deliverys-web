import { test } from '@playwright/test';
import { generarUser } from './utils/form-usuario';

test('test', async ({ page }) => {

    const user = generarUser();

  await page.goto('https://mercadolibre.com/');
  await page.getByRole('link', { name: 'Perú' }).click();
  await page.getByRole('link', { name: 'Moda', exact: true }).click();
  await page.getByRole('link', { name: 'Reloj Para Hombres Invicta' }).click();
  await page.goto('https://www.mercadolibre.com.pe/reloj-para-hombres-invicta-pro-diver-44709-oro-acero/p/MPE34223184?pdp_filters=deal%3AMPE1696641-2');
  await page.getByRole('button', { name: 'Comprar ahora' }).click();
  await page.getByTestId('login-link').click();
  await page.getByTestId('email').click();
  await page.getByTestId('email').fill(user.email);
  await page.getByTestId('phone').click();
  await page.getByTestId('phone').fill(user.phone);
  await page.getByTestId('first_name').click();
  await page.getByTestId('first_name').fill(user.firstName);
  await page.getByTestId('password').click();
  await page.getByTestId('password').fill(user.password);
  await page.getByTestId('submit').click();
});