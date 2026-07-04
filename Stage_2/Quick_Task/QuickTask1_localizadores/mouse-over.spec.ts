import { test, expect } from '@playwright/test';

test.describe('Mouse Over', () => {

  test('Mostrar la descripción al pasar el mouse sobre una imagen', async ({ page }) => {

    // Given: el usuario abre la página
    await page.goto('https://bonigarcia.dev/selenium-webdriver-java/mouse-over.html');

    await expect(page).toHaveTitle('Hands-On Selenium WebDriver with Java');

    // When: pasa el mouse sobre la imagen Compass
    const figuraCompass = page.locator('.figure').filter({
      hasText: 'Compass'
    });

    await figuraCompass.hover();

    // Then: se muestra la descripción de la imagen
    await expect(figuraCompass.getByText('Compass')).toBeVisible();

  });

});