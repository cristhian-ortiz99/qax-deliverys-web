import { test, expect } from '@playwright/test';

test.describe('Simular Teclas', () => {

  test('Modificar el tiempo de espera utilizando el teclado', async ({ page }) => {

    // Given el usuario abre la pagina
    await page.goto('https://bonigarcia.dev/selenium-webdriver-java/slow-calculator.html');

    await expect(page).toHaveTitle('Hands-On Selenium WebDriver with Java');

    const delay = page.locator('#delay');

    await expect(delay).toBeVisible();

    // When selecciona y modifica el tiempo de espera de la calculadora
    await delay.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await page.keyboard.type('2');

    // Then valida que se muestra el nuevo valor ingresado
    await expect(delay).toHaveValue('2');

  });

});