import { test, expect } from '@playwright/test';

test.describe('Manejo de Pestañas', () => {

  test('Abrir una nueva pestaña y validar la página de Selenium', async ({ page }) => {

    // Given
    await page.goto('https://demo.automationtesting.in/Windows.html');

    await expect(page).toHaveTitle('Frames & windows');

    // When
    const [newPage] = await Promise.all([
      page.waitForEvent('popup'),
      page.getByRole('button', { name: 'click' }).click()
    ]);

    // Esperar a que la nueva pestaña termine de cargar
    await newPage.waitForLoadState();

    // Then
    await expect(newPage).toHaveURL(/selenium\.dev/);
    await expect(newPage).toHaveTitle(/Selenium/);

  });

});